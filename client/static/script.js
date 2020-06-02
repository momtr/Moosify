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

        $('#track-container').html('');

        let inputString = $('#inputString').val();

        // get tracks from API
        let accessToken = Cookies.get('access_token');
        let res = await fetch(`/api/v1/recommendedSongs/${accessToken}?q=${inputString}`); // we get 10 tracks by default
        let json = await res.json();

        console.log(json);

        let tracks = json.data.tracks;

        for (let i = 0; i < tracks.length; i+=2) {
            $('#track-container').append(
            `<div class="row" id="${i}">
                <div class="card col">
                    <img src="${tracks[i].album.images[1].url}" onClick="selectedIDs.push('${tracks[i].id}')">
                    <h4>${tracks[i].name} by </h4><h4>${formatArtists(tracks[i].artists)}</h4>
                </div>
                <div class="card col">
                    <img src="${tracks[i+1].album.images[1].url}" onClick="selectedIDs.push('${tracks[i+1].id}')">
                    <h4>${tracks[i+1].name} by </h4><h4>${formatArtists(tracks[i+1].artists)}</h4>
                </div>
            </div>`);
            $(`#${tracks[i].id}`).click(() => {
                if($(`#${tracks[i].id}`).css('opacity') === '1')
                    $(`#${tracks[i].id}`).css('opacity', '0.5');
                else
                    $(`#${tracks[i].id}`).css('opacity', '1');
            })
            $(`#${tracks[i+1].id}`).click(() => {
                if($(`#${tracks[i+1].id}`).css('opacity') === '1')
                    $(`#${tracks[i+1].id}`).css('opacity', '0.5');
                else
                    $(`#${tracks[i+1].id}`).css('opacity', '1');
            })
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