const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json())

app.use(cors());
app.get('/posts', (req, res) => {
    res.send({})
})


app.post('/events', (req, res) => {
    console.log(req.body.type);
    res.send({})
})
app.listen(5002, () => {
    console.log('Listening 5002')
})