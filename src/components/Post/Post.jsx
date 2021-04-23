import React, {useState} from 'react';

import './Post.scss';

function Post() {

    const [postImage, setPostImage] = useState("");
    const [postText, setPostText] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = event =>{
        event.preventDefault();
        //make axios call
    }

    return (
        <div className = "post">
            <form className = "post__form">
                <div className = "post__image">
                    Upload Image
                </div>
                <textarea placeholder= "HTML text"/>
                <button type="submit">Submit Post</button>
            </form>
        </div>
    )
}

export default Post
