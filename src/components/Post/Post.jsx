import React, {useState, useRef} from 'react';
import axios from 'axios';
import { CssBaseline, AppBar, Container, Grid, Typography, Button, TextField, Card, Tooltip } from '@material-ui/core';

import usePostStyles from './PostStyles';

import RatingSlider from '../RatingSlider/RatingSlider';
import Evaluation from '../Evaluation/Evaluation';
import Category from '../Category/Category';


function Post() {

    const classes = usePostStyles();

    const [postImage, setPostImage] = useState("");
    const [imageType, setImageType] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [textRequestTime, setTextRequestTime] = useState("");
    const [imageRequestTime, setImageRequestTime] = useState("");

    const [textEvaluation, setTextEvaluation] = useState({Classification:{Category1:{Score:0}, Category2:{Score:0}, Category3:{Score:0}}, Terms:[], PII:{}});
    const [imageEvaluation, setImageEvaluation] = useState({RacyClassificationScore:0, AdultClassificationScore:0});

    const imageInput = useRef(null);

    const evaluateContent = event =>{

        axios.interceptors.request.use( x => {
            // to avoid overwriting if another interceptor
            // already defined the same object (meta)
            x.meta = x.meta || {};
            x.meta.requestStartedAt = new Date().getTime();
            return x;
        })
        
        axios.interceptors.response.use( x => {
                x.config.url === process.env.REACT_APP_AZURE_TEXT_ENDPOINT ? setTextRequestTime(`${ new Date().getTime() - x.config.meta.requestStartedAt} ms`) : setImageRequestTime(`${ new Date().getTime() - x.config.meta.requestStartedAt} ms`);
                return x;
            },
            // Handle 4xx & 5xx responses
            x => {
                console.error(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`)
                throw x;
            }
        )

        event.preventDefault();
        axios({
            method:'post',
            url:'https://pperlock-content-moderator.cognitiveservices.azure.com//contentmoderator/moderate/v1.0/ProcessText/Screen/?classify=True',
            data: event.target.postContent.value,
            headers:{
                'Content-type': 'text/plain',
                'Ocp-apim-subscription-key': process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY 
            }
        })
        .then(res=>{
            // console.log(res.data);
            setTextEvaluation({Classification:res.data.Classification, Terms: res.data.Terms, PII: res.data.PII})
        })

        axios({
            method:'post',
            url:'https://pperlock-content-moderator.cognitiveservices.azure.com//contentmoderator/moderate/v1.0/ProcessImage/Evaluate',
            data: postImage,
            headers:{
                'Content-type': imageType,
                'Ocp-apim-subscription-key': process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY 
            }
        })
        .then(res=>{
            setImageEvaluation(res.data);
            // setImageSliderMarkers({value:"Adult"});
        })
    }

    const fileSelectedHandler = (event) => {
        event.preventDefault();
        setPostImage(event.target.files[0]);
        setImageType(event.target.files[0].type);
    }

    const onDrop = (event) => {
        //prevents the file from being opened
        console.log(event.dataTransfer.files);
        event.preventDefault();

        for (var i = 0; i < event.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
          if (event.dataTransfer.items[i].kind === 'file') {
            setPostImage(event.dataTransfer.items[i].getAsFile());
            setImageType(event.dataTransfer.items[i].type)
          }
        }
    }

    const onDragEnter = event =>{
        event.stopPropagation();
    }
    
    const onDragOver = event =>{
        event.stopPropagation();
        event.preventDefault();  
    }

    const {ReviewRecommended, Category1, Category2, Category3} = textEvaluation.Classification;
    const piiKeys = Object.keys(textEvaluation.PII);
    const pii = piiKeys.map(key => textEvaluation.PII[key]);
    const piiText = piiKeys.map(key => textEvaluation.PII[key].length !==0 && textEvaluation.PII[key].map(item=> item.Text));

    return (
    <>
        <CssBaseline/>
        <AppBar position='relative' className={classes.titleBar}>
            <Typography variant="h4" align="center" gutterBottom>
                Content Moderator
            </Typography>
        </AppBar>
        <div className={classes.postContainer}>
            <form className={classes.form} id="upload__form" onSubmit={evaluateContent}>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            rows={10}
                            label="Post Text"
                            variant="outlined"
                            name="postContent"
                            // label="POST CONTENT"
                            defaultValue=" "
                            margin="normal"
                            multiline={true}
                            style={{width:'100%'}}
                        />
                    </Grid>
               
                    <Grid item xs={12} sm={6}>
                        <div className={classes.rightPost}
                            id="drop-thumb" 
                            onDrop={onDrop} 
                            onDragEnter={onDragEnter} 
                            onDragOver={onDragOver} 
                            style={{backgroundImage: `url(${postImage})`}}
                        >
                            {(!postImage && !showLoading) &&
                                <div className={classes.imageUpload}>
                                    <input type="file" style={{display:'none'}}  ref={imageInput} onChange={fileSelectedHandler}></input>
                                    {/* activate the hidden file input through the ref */}
                                    <Button onClick = {()=> imageInput.current.click()} variant="contained" color="primary">
                                        Select Image
                                    </Button>
                                    <p> OR DROP FILE HERE</p>
                                </div>
                            }
                            {showLoading && <img className="upload__loading" src="/assets/icons/loading-icon.gif" alt="loading icon"/>}
                            {(postImage && !showLoading) && <p>Uploaded Image: {postImage.name}</p>}
                            
                            <Button type="submit" color="primary" variant="contained" style={{width:'20%'}}>
                                Evaluate Post
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
        <Container>  
            <Grid container spacing={2}>
                <Grid item>
                    <Card className={classes.card}>
                        <div className={classes.titleWrapper}> 
                            <Typography variant='h5'> 
                                Text Review 
                            </Typography>
                            <Evaluation condition={ReviewRecommended} trueText = "Review Needed" falseText = "No Review Needed"/>
                        </div>

                        <Category categoryNum="1" score={Category1.Score} tooltip="refers to potential presence of language that may be considered sexually explicit or adult in certain situations"/>
                        <Category categoryNum="2" score={Category2.Score} tooltip="refers to potential presence of language that may be considered sexually suggestive or mature in certain situations."/>
                        <Category categoryNum="3" score={Category3.Score} tooltip="refers to potential presence of language that may be considered offensive in certain situations."/>

                        <Grid className={classes.flaggedInfo} container spacing={10}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6"> Flagged Language </Typography>
                                {textEvaluation.Terms.map(term=> <p key={term.Index}> {term.Term} </p>)}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6"> Flagged Personal Information </Typography>
                                {pii.map((info,i) => <p>{info.text} </p>)}
                                {piiKeys.map((key,i) => 
                                    <div>
                                        <p>{key}</p>
                                        <p>{piiText[i].length}</p>
                                        <p>{piiText[i][0]}</p>
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                    
                <Grid item xs={6}>
                    <Card className={classes.card}>
                        <div className={classes.titleWrapper}> 
                            <Typography variant="h5"> Image Review </Typography>
                            <Evaluation condition={imageEvaluation.IsImageAdultClassified || imageEvaluation.IsImageRacyClassified} trueText="Review Needed" falseText="No Review Needed"/>
                        </div>
                        <Evaluation condition={imageEvaluation.IsImageAdultClassified} trueText="Adult Content" falseText="No Adult Content"/>
                        <RatingSlider value={imageEvaluation.AdultClassificationScore.toFixed(2)} />

                        <Evaluation condition={imageEvaluation.IsImageRacyClassified} trueText="Racy Content" falseText="No Racy Content"/>
                        <RatingSlider value={imageEvaluation.RacyClassificationScore.toFixed(2)} />

                    </Card>
                </Grid>
            </Grid>
        </Container>
    </>
    )
}

export default Post
