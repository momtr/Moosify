// Biswas, Maitz, Mitterdorfer
// Server.js, 2020

// Spotify 
// move into env file!!

const scopes = "user-read-private user-read-email user-read-recently-played";

// npm modules
const express = require('express');
const path = require('path');
const querystring = require('querystring');
const fetch = require('node-fetch');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

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

app.get('/gotUser', async (req, res) => {
  let code = req.query.code || null;
  if(!code) {
    res.json({
      status: 'ERROR',
      message: 'code not specified'
    });
    return;
  }
  let apiResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: {
      code: code, //user id
      redirect_uri: 'https://moosify.herokuapp.com/gotUser',
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization' : 'Basic ' + new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')
    }
  });
  console.log(apiResponse);
});

app.get('*', (req, res) => {
  res.send('Page not found');
});

const port = process.env.PORT || 7000;
app.listen(port);

console.log(`Moosify listening on ${port}`);