const epxress = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = epxress();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
    console.log(req.body.type)
    res.send({})
})

app.listen(5003, () => {
    console.log('Listening on 5003');
})