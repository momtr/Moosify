/**
 * reactMiddleware.js file
 * @authors Biswas, Maitz, Miterdorfer
 * @version 0.0.1
 * @date 04/2020
 * @description redirect middleware
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