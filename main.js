const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const PORT = process.argv[2];

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log('llega')
    res.send(`Hola mundooo ${PORT}`)
})

app.post('/fileupload', (req, res) => {
    console.log(req)
    res.send(PORT);
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})