const fetch = require('node-fetch');
const qs = require('qs');

class SpotifyAPI {
    
    static async getUserObjectViaUserID(user_id, access_token) {
        try{
            const user_object = await fetch(`https://api.spotify.com/v1/users/${user_id}`, {
            method: 'GET',
            headers: { Authorization: "Bearer " + access_token}
            })
            return user_object.json();
        }
        catch(error){
            console.log(error);
        }
    }

    static async getCurrentUserObject(access_token) {
        try{
            const user_object = await fetch(`https://api.spotify.com/v1/me`, {
            method: 'GET',
            headers: { Authorization: "Bearer " + access_token}
            })
            return user_object.json();
        }
        catch(error){
            console.log(error);
        }
    }

    static async getRecentlyPlayed(access_token, numberOfSongs){
        try{
            const recentlyPlayed = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${numberOfSongs}`, {
            method: 'GET',
            headers: { 
                Authorization: "Bearer " + access_token,
                Accept: "application/json"
            }
            })
            let json = await recentlyPlayed.json();
            return json.items;
        }
        catch(error){
            console.log(error);
        }
    }

    static getSongIDsFromTrackArray(track_array){
        let track_ids = [];
        for(let i = 0; i < track_array.length; i++){
            track_ids[i] = track_array[i].track.id;
        }
        return track_ids;
    }

    static getSongIDsFromAudioFeaturesArray(featuresArray) {
        let ids = [];
        for(let i of featuresArray)
            ids.push(i.id);
        return ids;
    }

    static async getSeveralTracks(access_token, idArray) {
        let comma_sepperated_ids = idArray.join(',');
        try{
            const tracks = await fetch(`https://api.spotify.com/v1/tracks?ids=${comma_sepperated_ids}`, {
                method: 'GET',
                headers: { Authorization: "Bearer " + access_token}
            })
            let json = await tracks.json();
            return json.tracks;
        }
        catch(error){
            console.log(error);
        }
    }

    static async getAudioFeaturesOfTracks(access_token, id_array){
        let comma_sepperated_ids = id_array.join(",");
        try{
            const audio_features = await fetch(`https://api.spotify.com/v1/audio-features?ids=${comma_sepperated_ids}`, {
                method: 'GET',
                headers: { Authorization: "Bearer " + access_token}
            })
            let json = await audio_features.json();
            return json.audio_features;
        }
        catch(error){
            console.log(error);
        }
    }

    static async pushToLibrary(access_token, comma_sepperated_ids) {
        comma_sepperated_ids = comma_sepperated_ids.split(',').join('%2C');
        try{
            const request = await fetch(`https://api.spotify.com/v1/me/tracks?ids=${comma_sepperated_ids}`, {
                method: 'PUT',
                headers: { 
                    Authorization: "Bearer " + access_token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let json = await request.text();
            return json;
        }
        catch(error){
            console.log(error);
        }
    }

    static async createUserPlaylist(access_token, playlistName, trackIDs) {
        /** get the user's id */
        let userObject = await SpotifyAPI.getCurrentUserObject(access_token, playlistName);
        let userID = userObject.id;
        /** send request */
        try{
            const createPlaylist = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists?name=${playlistName}`, {
                method: 'POST',
                headers: { 
                    Authorization: "Bearer " + access_token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let json = await createPlaylist.json();
            let playlistID = json.id;
            console.log('playlist id', playlistID);
            console.log('json response', JSON.stringify(json));
            return SpotifyAPI.addItemsToPlaylist(access_token, playlistID, trackIDs);
        }
        catch(error){
            console.log(error);
        }
    }

    static createTrackURIsFromIDs(trackIDs) {
        let uris = [];
        for(let i of trackIDs)
            uris.push(`spotify:track:${i}`);
        return uris;
    }

    static async addItemsToPlaylist(access_token, playlistID, trackIDs) {
        let comma_seperated_uris = SpotifyAPI.createTrackURIsFromIDs(trackIDs).join(',');
        try{
            const request = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?uris=${comma_seperated_uris}`, {
                method: 'POST',
                headers: { 
                    Authorization: "Bearer " + access_token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            let json = await request.json();
            return json;
        }
        catch(error){
            console.log(error);
        }
    }

}

module.exports = SpotifyAPI;

