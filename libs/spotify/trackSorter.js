

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