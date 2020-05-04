/**
 * /auth index.js file
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description the middle ware server file for the Moosify Web App
 */


 /**
  * TODO:
  *     - [ ] Cookies
  *     - [ ] Respone -> Moodometer
  *     - [ ] Database via User Object
  *     - [ ] Requests via SpotifyAPI library
  */


const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const scopes = "user-read-private user-read-email user-read-recently-played";

const UserDB = require('../libs/user/user.class')();

const router = express.Router();
router.use(cookieParser());

/** path: auth/redirect */
router.get('/redirect', (req, res, next) => {
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: scopes,
            redirect_uri: "https://moosify.herokuapp.com/auth/gotUser"
        })
    );
});

/** path: /auth/gotUser */
router.get("/gotUser", (req, res, next) => {
    let code = req.query.code || null;

    if (!code) {
        console.log("code is not there!");
        res.send(JSON.stringify({
            status: 'error',
            message: 'code is not given'
        }));
        return;
    }

    let authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            code: code, //user id
            redirect_uri: "https://moosify.herokuapp.com/auth/gotUser",
            grant_type: "authorization_code"
        },
        headers: {
        Authorization:
            "Basic " +
            new Buffer(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64")
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            let access_token = body.access_token;
            let refresh_token = body.refresh_token;

            // use the access token to access the Spotify Web API
            //res.cookie('access_token', access_token, { maxAge: 900000, httpOnly: true });
            //res.cookie('refresh_token', refresh_token, { maxAge: 900000, httpOnly: true });
            //res.redirect('/mood');
            
            var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };

            // use the access token to access the Spotify Web API
            request.get(options, (error, response, body) => {
                //push to db
                UserDB.storeUser(body);
            }); 
        } else {
            console.log("error occured: ", error);
            sendResponseMessage(res, 10003, "Could not get access_token from API");
        }
    });
    next();
});

module.exports = router;