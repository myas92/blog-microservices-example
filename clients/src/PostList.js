import { useEffect, useState } from 'react';
import axios from 'axios';
export default () => {
    const [posts, setPost] = useState({})

    const fetchPosts = async () => {
        let { data } = await axios.get('http://localhost:4000/posts');
        setPost(data);
    }

    useEffect(() => {
        fetchPosts()
    }, [])// [] is call the fetchPosts function one time 

    const renderedPost = Object.values(posts).map(post => {
        return (
            <div className='card' style={{ width: '10rem' }} key={post.id}>
                <div className='card-body'>
                    <h1 className='card-title'>{post.title}</h1>
                </div>
            </div>
        )
    })
    return (
        <div className='d-flex flex-wrap justify-content-between'>
            {renderedPost}
        </div>
    )
}
