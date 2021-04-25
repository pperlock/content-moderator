import React, {useState} from 'react';
import axios from 'axios';
import Post from './components/Post/Post';
import FullAssessment from './components/FullAssessment/FullAssessment';

import { CssBaseline, AppBar, Typography, Container } from '@material-ui/core';
import useGlobalStyles from './globalStyles.js';

function App() {
	
	document.title="Content Moderator";

	const classes = useGlobalStyles();

	const [postImage, setPostImage] = useState(null);
	const [imageType, setImageType] = useState("");
	const [textRequestTime, setTextRequestTime] = useState("");
	const [imageRequestTime, setImageRequestTime] = useState("");

	const [textEvaluation, setTextEvaluation] = useState({Classification:{Category1:{Score:0}, Category2:{Score:0}, Category3:{Score:0}}});
	const [imageEvaluation, setImageEvaluation] = useState({RacyClassificationScore:0, AdultClassificationScore:0});

	const [isImageEvaluated, setIsImageEvaluated] = useState(false);
	const [isTextEvaluated, setIsTextEvaluated] = useState(false);

	const evaluateContent = event =>{

		event.preventDefault();

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
		
		//Make call to Text Moderator if there Text has been entered
		if (event.target.postContent.value !== " "){
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
				setTextEvaluation({Classification:res.data.Classification, Terms: res.data.Terms, PII: res.data.PII})
				setIsTextEvaluated(true);
			})
			.catch(err=>{
				console.log(err);
			})
		}

		if (!!postImage) {
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
				setIsImageEvaluated(true);
			})
			.catch(err=>{
				console.log(err)
			})
		}
	}

	const fileSelectedHandler = (event) => {
		event.preventDefault();
		setPostImage(event.target.files[0]);
		setImageType(event.target.files[0].type);
	}

	const onDrop = (event) => {
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

	return (
    <>
		<CssBaseline/>
        <AppBar position='relative' className={classes.titleBar}>
            <Typography variant="h4" align="center" gutterBottom>
                Content Moderator
            </Typography>
        </AppBar>
		<Container>
		<Post 
			onDrop={onDrop} 
			onDragEnter={onDragEnter} 
			onDragOver={onDragOver}
			fileSelectedHandler={fileSelectedHandler}
			evaluateContent={evaluateContent} 
			postImage={postImage} 
		/>
		<FullAssessment 
			textEvaluation={textEvaluation} 
			imageEvaluation={imageEvaluation}
			textRequestTime = {textRequestTime}
			imageRequestTime = {imageRequestTime}
			isTextEvaluated = {isTextEvaluated}
			isImageEvaluated = {isImageEvaluated}
		/>
		</Container>
    </>
  );
}

export default App;
