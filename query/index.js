const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const posts = {};
app.use(cors());
app.use(bodyParser.json())

app.get('/posts', (req, res) => {
    res.send(posts)
})


app.post('/events', (req, res) => {
    let { type, data } = req.body;
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
    res.send({})
})

app.listen(5002, () => {
    console.log('Listening 5002')
})