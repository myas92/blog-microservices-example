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
        console.log(data)
        const { id, content, postId } = data;
        const post = posts[postId]
        post.comments.push({ id, content });
    }
    console.log(posts)
    res.send({})
})

app.listen(5002, () => {
    console.log('Listening 5002')
})