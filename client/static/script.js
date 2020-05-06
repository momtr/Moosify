// this is just an example!! 

$(document).ready(function() {

    let selectedIDs = [];

    const selectTrack = (id) => selectedIDs.push(id);

    const pushSongsToLibrary = async (ids) => {
        let comma_seperated_ids = ids.join(',');
        let access_token = Cookies.get('access_token');
        let response = await fetch(`/api/v1/library/${access_token}?ids=${comma_seperated_ids}`, { 
            method: 'POST'
        });
        let json = response.json();
        console.log('/api/v1', json);
    }

    $('#selectTracks').hide();

    $('#getTracks').click(async () => {

        $('#tracks').html('');

        let inputString = $('#inputString').val();

        // get tracks from API
        let accessToken = Cookies.get('access_token');
        let res = await fetch(`/api/v1/recommendedSongs/${accessToken}?q=${inputString}`); // we get 10 tracks by default
        let json = await res.json();

        console.log(json);

        let tracks = json.data.tracks;

        for(let i of tracks) {
            let imgURL = i.album.images[0].url;
            $('#tracks').append(`<div><img src="${imgURL}" onClick="selectTrack('${i.id}')"><h3>${i.name}</h3></div>`)   
        }

        $('#getTracks').hide();
        $('#selectTracks').show();

    });

    $('#selectTracks').click(async () => {

        let response = await pushSongsToLibrary(selectedIDs);
        console.log(response);

    })

});