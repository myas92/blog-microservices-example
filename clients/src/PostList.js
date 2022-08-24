import { useEffect, useState } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'
export default () => {
    const [posts, setPost] = useState({})

    const fetchPosts = async () => {
        let { data } = await axios.get('http://localhost:5002/posts'); // Get data from Query Service
        console.log(data)
        setPost(data);
    }

    useEffect(() => {
        fetchPosts()
    }, [])// [] is call the fetchPosts function one time 

    const renderedPost = Object.values(posts).map(post => {
        return (
            <div className='card' style={{ width: '25rem' }} key={post.id}>
                <div className='card-body'>
                    <h5 className='card-title'>{post.title}</h5>
                    {/* <CommentList postId={post.id} /> */}
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
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
