import React, { useState } from 'react';
import axios from 'axios';
function CommentCreate({ postId }) {
    const [content, setContent] = useState('')

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:4005/posts/${postId}/comments`, {
            content
        })
        setContent('');
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <div className='mb-3'>
                        <label>New Comment</label>
                        <input
                            type="text"
                            className="form-control"
                            value={content}
                            onChange={e => setContent(e.target.value)} />
                    </div>
                </div>
                <button className='btn btn-primary'>Accept</button>
            </form>
        </>
    )
}


export default CommentCreate;