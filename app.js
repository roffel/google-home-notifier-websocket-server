'use strict';

const express = require('express');

// Constants
const PORT = 8080;

const WebSocket = require('ws');
var googlehome = require('google-home-notifier');
const language = 'nl'; // if not set 'us' language will be used
var app = express();

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        handleMessage(message);
    });
    ws.send('Received');
});

app.get('/', function (req, res) {
  res.send(req.querys);
  if(req.query.message) {
    handleMessage(req.query.message);
  }
});

app.listen(PORT + 1, function () {
  console.log('Example app listening on port ' + (PORT + 1));
});

function handleMessage(message) {
   googlehome.ip('192.168.1.85', language);
    if (message.startsWith('http')){
        // @TODO: Add more checks.
        // You can get the latest NOS journaal (Dutch news) by send https://download.omroep.nl/nos/radionieuws/nosnieuws_bulalg.mp3
        googlehome.play(message, function(notifyRes) {
            console.log(message);
        });
    } else {
        googlehome.notify(message, function(res) {
            console.log(res);
        });
    }
}