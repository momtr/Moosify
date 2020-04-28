/**
 * index.js file
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 04/2020
 * @description the main server file for the Moosify Web App
 */

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
 * @description the data we want to retrieve from the user
 */
const scopes = "user-read-private user-read-email user-read-recently-played";

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

app.use('/redirect', redirectMiddleware);
*/

app.get('/redirect', (req, res) => {
  res.redirect(
      "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
          response_type: 'code',
          client_id: process.env.CLIENT_ID,
          scope: scopes,
          redirect_uri: "https://moosify.herokuapp.com/gotUser"
      })
  );
});

app.get("/gotUser", function(req, res) {
  let code = req.query.code || null;

  if (!code) {
    console.log("code is not there!");
    sendResponseMessage(res, 10001, "Code is not given");
    return;
  }

  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code, //user id
      redirect_uri: redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64")
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      let refresh_token = body.refresh_token;

      // use the access token to access the Spotify Web API
      res.cookie("access_token", access_token);
      res.cookie("refresh_token", refresh_token);
      res.redirect("/mood");
    } 
    else {
      console.log("error occured: ", error);
      sendResponseMessage(res, 10003, "Could not get access_token from API");
    }
  });

/** 
 * Spotify calles this endpoint
 */
app.get('/________', (req, res) => {
  let code = req.query.code || null;
  /** send code to the client */
  if(!code) {
    res.json({
      status: 'ERROR',
      message: 'code not specified'
    });
    return;
  }
  
  /** request body */
  const body = {
    grant_type: 'authorization_code',
    //"Content-Type": "application/x-www-form-urlencoded",
    code: code,
    redirect_uri: 'https://moosify.herokuapp.com/gotUser', /** KEEEEP LIVING ON DREEEAAMS! */
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  }


  /** send POST request to Spitify Web API */
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: querystring.stringify(body)
  })
  .then(response => response.text())
  .then(text => console.log(text))
  .catch(err => console.log("Error: ", err));
  /** insert into DB */
  //let accessToken = await apiResponse.
  //let refreshToken = await apiResponse.refreshToken;
  //res.send('API response: ', apiResponse);
  //res.send('refresh token: ', refreshToken);
  /** get username and id from the Spotify Web API */
  // reuest here ...
  /** insert new user in databse */
  // ID | Username | access_token | user:object:stream
  /** Redirect to Mood (Mood-o-meter) */
});

app.get("/mood", (req, res) => {
  res.send("Application flow worked.")
})
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