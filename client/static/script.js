// this is just an example!! 

$(document).ready(function() {

    $('#getTracks').click(async () => {

        let inputString = $('#inputString').val();

        // get tracks from API
        let accessToken = Cookies.get('access_token');
        let res = await fetch(`/api/v1/recommendedSongs/${accessToken}?q=${inputString}`); // we get 10 tracks by default
        let json = await res.json();

        console.log(json);

        let tracks = json.data.tracks;

        for(let i of tracks) {
            let imgURL = i.images[0].url;
            $('#tracks').append(`<div><img src="${imgURL}"><h3>${i.name}</h3></div>`)   
        }

    })

})