const epxress = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = epxress();
const commentsByPostId = {};
app.use(bodyParser.json())

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const { content } = req.body;
    const commentId = randomBytes(4).toString("hex");
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content })
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments)
})


app.listen(4005, () => {
    console.log('Listening on 4005')
})