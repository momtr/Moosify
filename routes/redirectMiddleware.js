/**
 * reactMiddleware.js file
 * @authors Biswas, Maitz, Miterdorfer
 * @version 0.0.1
 * @date 04/2020
 * @description redirect middleware
 */

/** ========================= Spotify ========================= */
/**
 * @description the data we want to retrieve from the user
 */
const scopes = "user-read-private user-read-email user-read-recently-played";


/** ========================= NPM Modules ========================= */
/**
 * @description querystring is used for constructing query strings (..?key=value&key2=value2)
 */
const querystring = require('querystring');

/** ========================= Router ========================= */
/**
 * create a new router
 */

const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next) {
    res.redirect(
        "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.CLIENT_ID,
            scope: scopes,
            redirect_uri: "https://moosify.herokuapp.com/gotUser"
        })
    );
    console.log("Successfully redirected!");
});

module.exports = router;