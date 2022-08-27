const epxress = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = epxress();
app.use(bodyParser.json());
app.use(cors());


const posts = {};
app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    let id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    }

    await axios.post('http://localhost:5005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })
    res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
    console.log(req.body.type)
    res.send({})
})

app.listen(5000, () => {
    console.log('Listening on 5000');
})