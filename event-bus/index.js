const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res) => {
    const event = req.body;
    axios.post('http://localhost:5000/events', event);
    axios.post('http://localhost:5001/events', event);
    axios.post('http://localhost:5002/events', event);
    res.send({ status: 'OK' });
})

app.listen(5005, () => {
    console.log("Listening on 5005")
})