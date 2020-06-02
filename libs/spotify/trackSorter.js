/**
 * trackSort function
 * @authors Biswas, Maitz, Mitterdorfer
 * @version 0.0.1
 * @date 05/2020
 * @description this function sorts a track array according to the user's mood
 * @param {Object} tracksWithAudioFeatures SpotifyAPI.getAudioFeaturesOfTracks
 * @param {Number} moodScore the user's mood score, in range [0;1]
 * @param {Number} returnCount the number of tracks to return
 */
sortTracks = (tracksWithAudioFeatures, moodScore, returnCount = 10) => {

    tracksWithAudioFeatures.sort((a, b) => {
        let aMoodDifference = Math.abs(moodScore - a.valence);
        let bMoodDifference = Math.abs(moodScore - b.valence);
        if (aMoodDifference < bMoodDifference) return -1;
        else return 1;
    });

    let ids = tracksWithAudioFeatures.map(item => item.id);
    ids = ids.filter((val, index) => {
        for(let i = 0; i < ids.length; i++) {
            if(i != index && ids[i] == val)
                return false;
        }
        return true;
    })

    if (ids.length > returnCount) return ids.slice(0, returnCount);
    else return ids;
}

module.exports = sortTracks;