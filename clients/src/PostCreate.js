import React, { useState } from 'react';
import axios from 'axios'


function PostCreate() {
    const [title, setTitle] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://posts.com/posts/create', {
            title
        })
        setTitle('');
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <div className="mb-3">
                        <label htmlFor="x">Title</label>
                        <input type="text" id="x"
                            className='form-control'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>

                </div>

                <button className='btn btn-primary'>Submit</button>
            </form>
        </>
    )
}

export default PostCreate;