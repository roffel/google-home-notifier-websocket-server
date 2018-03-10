'use strict';

const express = require('express');

// Constants
const PORT = 8080;

const WebSocket = require('ws');
var googlehome = require('google-home-notifier');
var language = 'nl'; // if not set 'us' language will be used

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(message) {
		googlehome.ip('192.168.1.85', language);

		googlehome.notify(message, function(res) {
			console.log(res);
		});
	});
	ws.send('Received');
});