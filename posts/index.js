const epxress = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = epxress();
app.use(bodyParser.json());
app.use(cors());


const posts = {};
app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    let id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    }
    res.status(201).send(posts[id])
})


app.listen(5000, () => {
    console.log('Listening on 5000');
})