import React, {useRef} from 'react';

//Material UI imports
import { Grid, Typography, Button, ButtonGroup, TextField } from '@material-ui/core';

//Styling imports
import usePostStyles from './PostStyles';

/**
 * 
 * @param {function} inDrop
 * @param {function} onDragEnter
 * @param {function} onDragOver
 * @param {function} fileSelectedHandler
 * @param {function} evaluateContent
 * @param {string} postImage 
 */

function Post({onDrop, onDragEnter, onDragOver, fileSelectedHandler, evaluateContent, postImage}) {

    const classes = usePostStyles();
    
    //ref used to trigger hidden input text field
    const imageInput = useRef(null);

    return (
        <>
            <div className={classes.postContainer}>
                <form className={classes.form} id="upload__form" onSubmit={evaluateContent}>
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
            
                    <Grid 
                        container 
                        direction="row"
                        justify="space-between"
                        align-items="center"
                        spacing={5}
                        id="drop-thumb" 
                        onDrop={onDrop} 
                        onDragEnter={onDragEnter} 
                        onDragOver={onDragOver} 
                    >
                        {!postImage &&
                            <Grid item className={classes.fileUpload} xs={12} sm={6}>
                                <input type="file" style={{display:'none'}}  ref={imageInput} onChange={fileSelectedHandler}></input>
                                {/* activate the hidden file input through the ref */}
                                <Button onClick = {()=> imageInput.current.click()} variant="contained" className={classes.fileButton}>Select Image</Button>
                                <p className={classes.dropFileText}> OR DROP FILE HERE</p>
                            </Grid>
                        }
                        {postImage && 
                            <Typography variant="body1" className={classes.uploadedText}> Uploaded Image: <span className={classes.uploadedFileName}>{postImage.name}</span></Typography>}

                        <Grid item xs={12} sm={6}  style={{textAlign:'right'}}>
                            <ButtonGroup variant="contained" aria-label="contained primary button group">
                                <Button type="submit">Evaluate Post</Button>
                                <Button type="button" onClick={()=>{window.location.reload()}}>Reset</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </>
    )
}

export default Post
