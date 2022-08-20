import React, { useState } from 'react';
import axios from 'axios'


function PostCreate() {
    const { title, setTitle } = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title
        })
        setTitle('');
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="x">Title</label>
                    <input type="text" id="x"
                        className='form-control'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <button className='btn btn-primary'>Submit</button>
            </form>
        </>
    )
}

export default PostCreate;