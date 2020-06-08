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
    $('#footer').hide();

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
        $('#call-to-action').html('Select songs you like. They will be added to a newly created playlist.');

        // get tracks from API
        let accessToken = Cookies.get('access_token');
        let res = await fetch(`/api/v1/recommendedSongs/${accessToken}?q=${inputString}`); // we get 10 tracks by default
        let json = await res.json();

        console.log(json);

        let tracks = json.data.tracks;

        for (let i = 0; i < tracks.length; i+=2) {
            $('#track-container').append(
            `<div class="song" id="${i}">
                <div class="card 6 col" id="${tracks[i].id}">
                    <img class="w-100" src="${tracks[i].album.images[1].url}">
                    <h5>${tracks[i].name} by </h5><h5>${formatArtists(tracks[i].artists)}</h5>
                </div>
                <div class="card 6 col" id="${tracks[i+1].id}">
                    <img class="w-100" src="${tracks[i+1].album.images[1].url}">
                    <h5>${tracks[i+1].name} by </h5><h5>${formatArtists(tracks[i+1].artists)}</h5>
                </div>
            </div>`);
            $(`#${tracks[i].id}`).click(() => {
                let id = tracks[i].id;
                let index = selectedIDs.indexOf(id);
                if(index === -1) {
                    selectedIDs.push(id);
                    $(`#${id}`).addClass('selected');
                } else {
                    selectedIDs.splice(index, 1);
                    $(`#${id}`).removeClass('selected');
                }
            })
            $(`#${tracks[i+1].id}`).click(() => {
                let id = tracks[i+1].id;
                let index = selectedIDs.indexOf(id);
                if(index === -1) {
                    selectedIDs.push(id);
                    $(`#${id}`).addClass('selected');
                } else {
                    selectedIDs.splice(index, 1);
                    $(`#${id}`).removeClass('selected');
                }
            })
        }

        $('#getTracks').hide();
        $('#selectTracks').show();
        $('#footer').show();
    });

    $('#selectTracks').click(async () => {

        let inputString = ($('#inputString').val() + ' :)') || 'Moosify :)';
        let response = await pushSongsToLibrary(selectedIDs, inputString);
        console.log('response', response);
        
        /** redirect to created page */
        window.location.href = `/created`;

    })
});