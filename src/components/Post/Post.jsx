import React, {useRef} from 'react';
import { Grid, Typography, Button, TextField } from '@material-ui/core';

import usePostStyles from './PostStyles';

function Post({onDrop, onDragEnter, onDragOver, fileSelectedHandler, evaluateContent, postImage, showLoading}) {

    const classes = usePostStyles();
    const imageInput = useRef(null);

    return (
    <>
        <div className={classes.postContainer}>
            <form className={classes.form} id="upload__form" onSubmit={evaluateContent}>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            rows={10}
                            label="Post Text"
                            variant="outlined"
                            name="postContent"
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
                            <Button type="" onClick={()=>{window.location.reload()}} color="primary" variant="contained" style={{width:'20%'}}>
                                Reset
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </div>
    </>
    )
}

export default Post
