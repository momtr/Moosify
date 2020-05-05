/**
 * /api index.js file
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description the middle ware server file for the Moosify Web App
 */


const express = require('express');
const cookieParser = require('cookie-parser');

const SpotifyAPI = require('../libs/spotify/spotify.class');

const getRouter = (db) => {
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
    });

    return router;
};


module.exports = getRouter;