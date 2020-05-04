const fetch = require('node-fetch');
const firebaseDB = require('../database/database');
const db = new firebaseDB.FirebaseRealTime();

class SpotifyAPI {
    
    static async getUserObjectViaUserID(user_id, access_token) {
        const user_object = await fetch(`https://api.spotify.com/v1/users/${user_id}`, {
            method: 'GET',
            headers: { Authorization: "Bearer " + access_token}
        })
        return user_object.json();
    }

    static async getCurrentUserObject(access_token) {
        const user_object = await fetch(`https://api.spotify.com/v1/me`, {
            method: 'GET',
            headers: { Authorization: "Bearer " + access_token}
        })
        return user_object.json();
    }

    static async getRecentlyPlayed(access_token){
        const recentlyPlayed = await fetch(`https://api.spotify.com/v1/me/player/recently-played`, {
            method: 'GET',
            headers: { Authorization: "Bearer " + access_token}
        })
        return recentlyPlayed.json();
    }


}

module.exports = SpotifyAPI;

