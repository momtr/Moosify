/**
 * /api index.js file
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description the middle ware server file for the API of Moosify Web App
 */


const express = require('express');
const cookieParser = require('cookie-parser');

const SpotifyAPI = require('../libs/spotify/spotify.class');

const SentimentAnalysis = require('../libs/sentimentAnalysis/sentimentAnalysis');
const analyzer = new SentimentAnalysis();

const sortTracks = require('../libs/spotify/trackSorter');
const normalizeMood = require('../libs/sentimentAnalysis/moodNormalizer');

/** recon */
const ReconClient = require('recon-engine-client');
const RECON_API_KEY = '1fd04e32-4219-41ce-b4d3-856f75cf7f7a';
const recon = new ReconClient({ token: RECON_API_KEY });

const getRouter = (db) => {
    const router = express.Router();
    router.use(cookieParser());

    /** path: /api/v1/recommendedSongs/accessToken */
    router.get('/recommendedSongs/:accessToken', async (req, res, next) => {
        let accessToken = req.params.accessToken || 0;
        let moodString = req.query.q || '';
        let numberOfTracks = req.query.num || 10;
        /** get the username */
        let userObject = await SpotifyAPI.getCurrentUserObject(accessToken);
        let userID = userObject.id;
        /** get the user's songs from the database */
        let usersTracks = await db.getData(`users/${userID}/audioFeatures`);
        if (!usersTracks) {
            res.json({
                status: 'error',
                message: 'something did not work, maybe the user\'s accessToken has already expired or the user ist not registered'
            });
            return;
        }
        /** do sentiment analysis with the query string */
        let mood = analyzer.getScore(moodString).score;
        /** sort tracks according to mood */
        let normalizedMood = normalizeMood(mood);
        /** now the mood is between -5 and +5, however, we want it to be in range [0;1] */
        let trackFeatures = sortTracks(usersTracks, normalizedMood, numberOfTracks);
        // let idArray = SpotifyAPI.getSongIDsFromAudioFeaturesArray(trackFeatures);
        //      idsArray
        /** user actions for that user (only 10 songs) */
        let ids = [];
        for(let i of trackFeatures) {
            ids.push(i.id);
        }
        recon.userMultipleActions(userID, ids);
        /** get recommendations for user */      
        let recommendedTracksIds = [];
        let recommendedTracks = await recon.recommend(userID);
        for(let i of recommendedTracks) {
            recommendedTracksIds.push(i.id);
        }        
        trackFeatures = trackFeatures.concat(recommendedTracksIds);
        /** audio features */
        let tracks = await SpotifyAPI.getSeveralTracks(accessToken, trackFeatures);
        res.json({
            status: 'success',
            message: 'your received all tracks in the track object',
            data: { tracks, normalizedMood, mood, moodString }
        });
        /** sotore user query in database */
        db.insertData('users', `${userID}/moodQueries/${Date.now()}`, { normalizedMood, mood, moodString });
    });

    router.get('/user/:accessToken', async (req, res, next) => {
        let accessToken = req.params.accessToken || 0;
        let userProfile = await SpotifyAPI.getCurrentUserObject(accessToken);
        res.json({
            status: 'success',
            message: 'no server error (check spotify data as well)',
            data: userProfile
        });
    });

    router.post('/library/:accessToken', async (req, res, next) => {
        let accessToken = req.params.accessToken || 0;
        let trackIDs = req.query.ids || [];
        /** push songs to library */
        let apiResponse = await SpotifyAPI.pushToLibrary(accessToken, trackIDs);
        res.json({
            status: 'success',
            message: 'tracks were pushed to the libary',
            data: apiResponse
        });
    });

    router.post('/playlists/:accessToken', async (req, res, next) => {
        let accessToken = req.params.accessToken || 0;
        let trackIDs = JSON.parse(req.query.ids) || [];
        let playlistName = req.query.name || 'Moosify';
        let createPlaylist = await SpotifyAPI.createUserPlaylist(accessToken, playlistName, trackIDs);
        res.json({
            status: 'success',
            message: `playlist ${playlistName} has been sucessfully created`,
            data: createPlaylist
        });
    })

    return router;
};


module.exports = getRouter;