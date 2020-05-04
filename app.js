
/**
 * index.js file
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 04/2020 * @description the main server file for the Moosify Web App
 */

/** ========================= Modules ========================= */ 
/**
 * @description Firebase Database
 */
const firebaseDB = require('./libs/database/database.js');
const db = new firebaseDB.FirebaseRealTime();
/**
 * @description express is used for the server
 */
const express = require('express');
/**
 * @description path is used for server specific paths
 */
const path = require('path');
/**
 * @description fetch (i.e. node-fetch) is used for sending HTTP requests
 */
const fetch = require('node-fetch');
/**
 * @description request 
 */
const request = require('request');
/**
 * @description querystring
 */
const querystring = require('querystring');
/**
 * @description cookie-parser 
 */
const cookieParser = require('cookie-parser');
/**
 * @description the data we want to retrieve from the user
 */
const scopes = "user-read-private user-read-email user-read-recently-played";

/** middleware */
const auth = require('./auth/index');

/** ========================= Express App ========================= */
/**
 * @description app is a newly created express app
 */
const app = express();

/** ========================= Static Files ========================= */
/**
 * we want to use the client's build folder as a static asset
 */
app.use(express.static(path.join(__dirname, 'client/static')));
app.use(cookieParser());


/** ========================= Endpoints / Middlewares ========================= */
/** 
 * display landing page in front-end if endpoint '/' is called
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/views/index.html'));
});

app.use('/auth', auth);

app.get('/mood', (req, res) => {
  let access_token = req.cookies.access_token;
  res.send("Application flow worked.")
});

/** 
 * called if no enpoint '/..' matches the endpoint specified in the URL 
 */
app.get('*', (req, res) => {
  res.send('Page not found');
});

/** ========================= Start the Server ========================= */
/** 
 * start the server (on the port specified in the environment)
 */
const port = process.env.PORT || 7000;
app.listen(port);

console.log(`Moosify listening on ${port}`);