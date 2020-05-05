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
        if(aMoodDifference < bMoodDifference) return -1;
        else return 1;
    });
    if(tracksWithAudioFeatures.length > returnCount) return tracksWithAudioFeatures.slice(0, returnCount);
    else return tracksWithAudioFeatures;
}

module.exports = sortTracks;