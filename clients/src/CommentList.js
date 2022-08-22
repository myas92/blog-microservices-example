import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default ({ postId }) => {
    const [comments, setComments] = useState([])

    async function fetchComments() {
        const { data } = await axios.get(`http://localhost:5001/posts/${postId}/comments`);
        setComments(data);
    }

    useEffect(() => {
        fetchComments()
    }, [])


    const renderedComments = comments.map((comment) => {
        return (
            <li key={comment.id} className=''>
                {comment.content}
            </li>
        )
    })
    return (
        <ul>
            {renderedComments}
        </ul>
    )
}