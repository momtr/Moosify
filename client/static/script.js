// this is just an example!! 

let selectedIDs = [];

$(document).ready(function () {

    const pushSongsToLibrary = async (ids, name) => {
        let comma_seperated_ids = ids.join(',');
        let access_token = Cookies.get('access_token');

        let library = await fetch(`/api/v1/library/${access_token}?ids=${comma_seperated_ids}`, {
            method: 'POST'
        });
        let json_library = await library.json();

        let playlists = await fetch(`/api/v1/playlists/${access_token}?ids=${JSON.stringify(ids)}&name=${name}`, {
            method: 'POST'
        });
        let json_playlists = await playlists.json();

        return { json_library, json_playlists };
    }

    $('#selectTracks').hide();

    $('#getTracks').click(async () => {
        function formatArtists(array){
            if(array.length === 1)
                return array[0].name;
            
            let resultString = "";
            for(let k = 0; k < array.length; k++){
                if(k === array.length-1)
                    resultString += array[k].name;
                else
                    resultString += array[k].name + ", ";
            }
            return resultString;
        }

        $('#tracks').html('');

        let inputString = $('#inputString').val();

        // get tracks from API
        let accessToken = Cookies.get('access_token');
        let res = await fetch(`/api/v1/recommendedSongs/${accessToken}?q=${inputString}`); // we get 10 tracks by default
        let json = await res.json();

        console.log(json);

        let tracks = json.data.tracks;

        for (let i of tracks) {
            let imgURL = i.album.images[1].url;
            let artistString = formatArtists(i.artists);
            $('#tracks').append(`<div class="songItems vivify fadeIn"><img src="${imgURL}" onClick="selectedIDs.push('${i.id}')"><h3>${i.name} |</h3><h3>${artistString}</h3></div>`);
        }

        $('#getTracks').hide();
        $('#selectTracks').show();
    });

    $('#selectTracks').click(async () => {

        let inputString = $('#inputString').val();
        let response = await pushSongsToLibrary(selectedIDs, inputString);
        console.log('response', response);

    })
});