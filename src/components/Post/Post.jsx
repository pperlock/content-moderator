import React, {useRef} from 'react';
import { Grid, Typography, Button, ButtonGroup, TextField } from '@material-ui/core';

import usePostStyles from './PostStyles';

function Post({onDrop, onDragEnter, onDragOver, fileSelectedHandler, evaluateContent, postImage}) {

    const classes = usePostStyles();
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
        
                <Grid container direction="row" justify="space-between" align-items="center"
                    id="drop-thumb" 
                    onDrop={onDrop} 
                    onDragEnter={onDragEnter} 
                    onDragOver={onDragOver} 
                >
                    {!postImage &&
                        <Grid item>
                            <input type="file" style={{display:'none'}}  ref={imageInput} onChange={fileSelectedHandler}></input>
                            {/* activate the hidden file input through the ref */}
                            <Button onClick = {()=> imageInput.current.click()} variant="contained" color="primary">
                                Select Image
                            </Button>
                            <p> OR DROP FILE HERE</p>
                        </Grid>
                    }
                    {postImage && <p>Uploaded Image: {postImage.name}</p>}

                    <Grid item>
                        <ButtonGroup color="primary" variant="text" aria-label="contained primary button group">
                            <Button type="submit">
                                    Evaluate Post
                                </Button>
                            <Button type="button" onClick={()=>{window.location.reload()}} >
                                Reset
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </form>
        </div>
    </>
    )
}

export default Post
