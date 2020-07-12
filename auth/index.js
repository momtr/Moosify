/**
 * /auth index.js file
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description the middle ware server file for the Moosify Web App
 */


const express = require('express');
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const scopes = "user-read-private user-read-email user-read-recently-played user-library-modify playlist-modify-public playlist-modify-private";

const SpotifyAPI = require('../libs/spotify/spotify.class');

const getRouter = (db) => {
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

        request.post(authOptions, async (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let access_token = body.access_token;
                let refresh_token = body.refresh_token;

                // use the access token to access the Spotify Web API
                res.cookie('access_token', access_token, { maxAge: 900000, httpOnly: false });
                res.cookie('refresh_token', refresh_token, { maxAge: 900000, httpOnly: false });
                res.redirect('/mood');
                
                /** get user data */
                let userObject = await SpotifyAPI.getCurrentUserObject(access_token);
                /** get user's recently played songs + audio features */
                let recentlyPlayedTrackIDs = await SpotifyAPI.getRecentlyPlayed(access_token, 50);
                let trackIDs = SpotifyAPI.getSongIDsFromTrackArray(recentlyPlayedTrackIDs);
                let audioFeatures = await SpotifyAPI.getAudioFeaturesOfTracks(access_token, trackIDs);
                let user = { userObject, audioFeatures, recentlyPlayedTrackIDs };
                db.insertData('users', userObject.id, user);
                db.insertData('tracks', Date.now(), trackIDs);

            } else {
                console.log("error occured: ", error);
                res.json({
                    status: 'error',
                    message: 'Could not get access_token from API'
                });
            }
        });
        
    });

    return router;
    
}

module.exports = getRouter;