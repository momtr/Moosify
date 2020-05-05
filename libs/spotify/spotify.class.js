const fetch = require('node-fetch');

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
            const recentlyPlayed = await fetch(`https://api.spotify.com/v1/me/player/recently-played/?limit=${numberOfSongs}`, {
            method: 'GET',
            headers: { Authorization: "Bearer " + access_token}
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

    static async getAudioFeaturesOfTracks(access_token, id_array){
        let comma_sepperated_ids = id_array.join(",");
        try{
            const audio_features = await fetch(`https://api.spotify.com/v1/audio-features/${comma_sepperated_ids}`, {
                method: 'GET',
                headers: { Authorization: "Bearer " + access_token}
            })
            let json = await audio_features.json();
            return json;
        }
        catch(error){
            console.log(error);
        }
    }

}

module.exports = SpotifyAPI;
