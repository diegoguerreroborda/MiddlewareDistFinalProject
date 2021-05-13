const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const PORT = 3050;

const app = express()
app.use(bodyParser.json())

app.post('/fileupload', (req, res) => {
    console.log(req)
    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://172.17.0.1:${PORT}`)
})