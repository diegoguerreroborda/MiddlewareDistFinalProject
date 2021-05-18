const express = require('express');
const axios = require('axios');
var amqp = require('amqplib/callback_api');
const CircularJSON = require('circular-json');
var flatted = require('flatted');
var cors = require('cors')
const bodyParser = require('body-parser');

var multer  = require('multer')
var upload = multer({dest: './uploads/' })

const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

const PORT = 3050;

const app = express()
app.use(cors())
app.use(bodyParser.json())

cloudinary.config({
    cloud_name: "dyp8wrgbw",
    api_key: "315461241188818",
    api_secret: "r-sNPDYhLcLIMicS2UQ8XwatvsI"
  });

app.get('/', (req, res) => {
    console.log('llega')
    res.send(`Hola mundooo ${PORT}`)
})

app.post('/fileupload', upload.any(), (req, res) => {
    console.log(req.files[0].path)
    console.log(req.body.description)
    
    cloudinary.uploader.upload(req.files[0].path, 
  { resource_type: "video",
    chunk_size: 6000000,
    eager: [
      { width: 300, height: 300, crop: "pad", audio_codec: "none" }, 
      { width: 160, height: 100, crop: "crop", gravity: "south", audio_codec: "none" } ],                                   
    eager_async: true,
    eager_notification_url: "https://mysite.example.com/notify_endpoint" },
    function(error, result) {
        //console.log(result, error)
        let data = {email: req.body.description, path: result.url}
        console.log(data)
        sendData(data)
    });
    
    res.sendStatus(200);
})

function sendData(data){
    let myJson = flatted.stringify(data);
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'task_queue';
            channel.assertQueue(queue, {
                durable: true
            });
            channel.sendToQueue(queue, Buffer.from(myJson), {
                persistent: true
            });
            console.log(" [x] Sent '%s'");
        });
        setTimeout(function () {
            connection.close();
        }, 1500);
    });
}
/*
app.post('/fileupload', (req, res) => {
    //console.log(req)
    let myJson = flatted.stringify(req);
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'task_queue';
            channel.assertQueue(queue, {
                durable: true
            });
            channel.sendToQueue(queue, Buffer.from(myJson), {
                persistent: true
            });
            console.log(" [x] Sent '%s'");
        });
        setTimeout(function () {
            connection.close();
        }, 1500);
    });
    
    res.sendStatus(200);
})
*/

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})