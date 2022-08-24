const epxress = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = epxress();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type == "CommentModerated") {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:5005/events', {
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        })
    }
    res.send({})
})

app.listen(5003, () => {
    console.log('Listening on 5003');
})