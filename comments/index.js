const epxress = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = epxress();
const commentsByPostId = {};
app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const { content } = req.body;
    const commentId = randomBytes(4).toString("hex");
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'pending' });
    await axios.post("http://localhost:5005/events", {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
})

app.post('/events', async (req, res) => {
    console.log('Event Recived', req.body.type)
    const { type, data } = req.body;
    if (type == 'CommentModerated') {
        const { postId, id, content, status } = data
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id == id);
        comment.status = status;
        await axios.post('http://localhost:5005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                content,
                postId,
                status
            }
        })
    }
    console.log(req.body.type)
    res.send({})
})


app.listen(5001, () => {
    console.log('Listening on 5001')
})