import React, {useState, useRef} from 'react';
import axios from 'axios';

import './Post.scss';

const AZURE_ENDPOINT = 'https://pperlock-content-moderator.cognitiveservices.azure.com/';
const AZURE_TEXT_URL = `https://pperlock-content-moderator.cognitiveservices.azure.com//contentmoderator/moderate/v1.0/ProcessText/Screen/?classify=True`;


// POST {Endpoint}/contentmoderator/moderate/v1.0/ProcessText/Screen/?language=eng&autocorrect=False&PII=False&listId=&classify=False
// Ocp-Apim-Subscription-Key: 34adfa4f-cedf-4dc0-ba29-b6d1a69ab345
// Content-Type: text/plain

function Post() {

    const [postImage, setPostImage] = useState("");
    const [imageType, setImageType] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [textRequestTime, setTextRequestTime] = useState("");
    const [imageRequestTime, setImageRequestTime] = useState("");

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
                x.config.url === AZURE_TEXT_URL ? setTextRequestTime(`${ new Date().getTime() - x.config.meta.requestStartedAt} ms`) : setImageRequestTime(`${ new Date().getTime() - x.config.meta.requestStartedAt} ms`);
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
            url:AZURE_TEXT_URL,
            data: event.target.postContent.value,
            headers:{
                'Content-type': 'text/plain',
                'Ocp-apim-subscription-key': 'b05d164f9bfa4d4db6a68a1319335169' 
            }
        })
        .then(res=>{
            console.log(res);
        })

        axios({
            method:'post',
            url:`https://pperlock-content-moderator.cognitiveservices.azure.com//contentmoderator/moderate/v1.0/ProcessImage/Evaluate`,
            data: postImage,
            headers:{
                'Content-type': imageType,
                'Ocp-apim-subscription-key': 'b05d164f9bfa4d4db6a68a1319335169' 
            }
        })
        .then(res=>{
            console.log(res);
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

    console.log(textRequestTime, imageRequestTime);
    return (
            <form className="upload__form" id="upload__form" onSubmit={evaluateContent}>
            <div className="upload__upper">
                <div className="upload__files">
                    <div id="drop-thumb" 
                        onDrop={onDrop} 
                        onDragEnter={onDragEnter} 
                        onDragOver={onDragOver} 
                        className="upload__thumb-wrapper"
                        style={{backgroundImage: `url(${postImage})`}}>
                        {(!postImage && !showLoading) &&
                            <div className = "upload__file-wrapper">
                                <input type="file" style={{display:'none'}}  ref={imageInput} onChange={fileSelectedHandler}></input>
                                {/* activate the hidden file input through the ref */}
                                <button className="upload__file-button" type="button" onClick = {()=> imageInput.current.click()}>Select Thumbnail File</button>
                                <p className="upload__file-text"> OR DROP FILE HERE</p>
                            </div>
                        }
                        {showLoading && <img className="upload__loading" src="/assets/icons/loading-icon.gif" alt="loading icon"/>}
                        {(postImage && !showLoading) && <p className="upload__file-success">SUCCESS</p>}
                    </div>
                </div>
                <div className="upload__inputs">
                    <label className="upload__label" htmlFor="uploadTitle">POST TITLE</label>
                    <input className="upload__video-title" name="uploadTitle" type="text" placeholder="Adda title for post" required/>
                    <label className="upload__label" htmlFor="uploadDescription">POST CONTENT</label>
                    <textarea className="upload__video-description" form="upload__form" wrap="hard" name="postContent" id="postContent" placeholder="Add post content" rows="3" cols="20" required></textarea>
                </div>
            </div>
            <div className="upload__lower">
                <button className="upload__publish" type="submit">EVALUATE</button>
            </div>
        </form>
    )
}

export default Post
