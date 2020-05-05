/**
 * /api index.js file
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description the middle ware server file for the Moosify Web App
 */


const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const scopes = "user-read-private user-read-email user-read-recently-played";

const firebase = require('../libs/database/database');
const db = new firebase.FirebaseRealTime();

const SpotifyAPI = require('../libs/spotify/spotify.class');

const router = express.Router();
router.use(cookieParser());

/** path: /api/v1/recommendedSongs/accessToken */
router.get('/recommendedSongs/:accessToken', async (req, res, next) => {
    let accessToken = req.params.accessToken;
    /** get the username */
    let userObject = await SpotifyAPI.getCurrentUserObject(accessToken);
    let userID = userObject.id;
    /** get the user's songs from the database */
    let usersTracks = await db.getData(`users/${userID}/audioFeatures`);
    res.send(usersTracks)
})

module.exports = router;