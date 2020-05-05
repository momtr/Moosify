/**
 * index.js file
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 04/2020 * @description the main server file for the Moosify Web App
 */

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const firebase = require('../libs/database/database');
const db = new firebase.FirebaseRealTime();

const app = express();

/** middleware */
const auth = require('./auth/index');
const api = require('./api/moodometer');

app.use(express.static(path.join(__dirname, 'client/static')));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/views/index.html'));
});

app.use('/auth', auth(db));
app.use('/api/v1', api(db));

app.get('/mood', (req, res) => {
  let access_token = req.cookies.access_token;
  res.sendFile(path.join(__dirname+'/client/views/mood.html'));
});

/** 
 * called if no enpoint '/..' matches the endpoint specified in the URL 
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/views/pageNotFound404.html'));
});


const port = process.env.PORT || 7000;
app.listen(port);
console.log(`Moosify listening on ${port}`);