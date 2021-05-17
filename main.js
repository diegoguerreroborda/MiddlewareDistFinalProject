const express = require('express');
const axios = require('axios');
var cors = require('cors')
const bodyParser = require('body-parser');

const PORT = 3050;

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('llega')
    res.send(`Hola mundooo ${PORT}`)
})

app.post('/fileupload', (req, res) => {
    console.log(req)
    res.sendStatus(200);
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})