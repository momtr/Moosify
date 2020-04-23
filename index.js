/**
 * index.js file
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 04/2020
 * @description the main server file for the Moosify Web App
 */

/** ========================= Spotify ========================= */
/**
 * @description the data we want to retrieve from the user
 */
const scopes = "user-read-private user-read-email user-read-recently-played";


/** ========================= NPM Modules ========================= */
/**
 * @description express is used for the server
 */
const express = require('express');
/**
 * @description path is used for server specific paths
 */
const path = require('path');
/**
 * @description querystring is used for constructing query strings (..?key=value&key2=value2)
 */
const querystring = require('querystring');
/**
 * @description fetch (i.e. node-fetch) is used for sending HTTP requests
 */
const fetch = require('node-fetch');
/**
 * @description middleware for redirecting to Spotify Web API
 */
const redirectMiddleware = require('./routes/redirectMiddleware');

/** ========================= Express App ========================= */
/**
 * @description app is a newly created express app
 */
const app = express();

/** ========================= Static Files ========================= */
/**
 * we want to use the client's build folder as a static asset
 */
app.use(express.static(path.join(__dirname, 'client/build')));

/** ========================= Endpoints / Middlewares ========================= */
/** 
 * display landing page in front-end if endpoint '/' is called
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


/** 
 * @description if endpoint '/redirect' is called, redirect the user in the front-end to the Spotify's redirect endpoint 
 */
app.use('/redirect', redirectMiddleware);


/** 
 * Spotify calles this endpoint
 */
app.get('/gotUser', async (req, res) => {
  let code = req.query.code || null;
  if(!code) {
    res.json({
      status: 'ERROR',
      message: 'code not specified'
    });
    return;
  }
  /** send POST request to Spitify Web API */
  let apiResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: {
      code: code,
      redirect_uri: 'https://moosify.herokuapp.com/gotUser',
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization' : 'Basic ' + new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')
    }
  });
  console.log(apiResponse);
});

/** 
 * called if no enpoint '/..' matches the endpoint specified in the URL 
 */
app.get('*', (req, res) => {
  res.send('Page not found');
});

/** 
 * start the server (on the port specified in the environment)
 */
const port = process.env.PORT || 7000;
app.listen(port);

console.log(`Moosify listening on ${port}`);