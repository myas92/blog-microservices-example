const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const posts = {};
app.use(cors());
app.use(bodyParser.json())

app.get('/posts', (req, res) => {
    res.send(posts)
})

const handleEvent = (type, data) => {
    if (type == 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    if (type == 'CommentCreated') {
        const { id, content, postId } = data;
        const post = posts[postId]
        post.comments.push({ id, content });
    }
    if (type == 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id == id);
        comment.status = status;
        comment.content = content;
    }

}
app.post('/events', (req, res) => {
    let { type, data } = req.body;
    handleEvent(type, data)
    res.send({})
})

app.listen(5002, async () => {
    console.log('Listening 5002');
    let { data } = await axios.get('http://localhost:5005/events')
    for (let event of data) {
        console.log('Processing event:', event.type);
        handleEvent(event.type, event.data)
    }
}) 