// this is just an example!! 

$(document).ready(function() {

    $('#getTracks').click(async () => {

        let inputString = $('#inputString').val();

        // get tracks from API
        let accessToken = Cookies.get('accessToken');
        let tracks = await fetch(`/api/v1/recommendedSongs/${accessToken}?q=${inputString}`); // we get 10 tracks by default
        let json = await tracks.json();

        console.log(json);

        for(let i of json) {
            let imgURL = i.images[0].url;
            $('#tracks').append(`<div><img src="${imgURL}"><h3>${i.name}</h3></div>`)   
        }

    })

})