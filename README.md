# Moosify

Welcome to our web app ;) <br />
🎉💿🎵

## Topic - Moosify
We want to create a webapplication which uses the Spotify Web API to recommend songs based on the users mood which he states when opening the page as well as implementing a mood diagram based on the users "mood history".
<br /><br />Link to the web app: [Moosify](http://moosify.herokuapp.com)

## Kickoff
2020-02

## Team
Cien, Alex, Moritz 

## Setup
- `Server`: Heroku
- `Database`: Google Firebase
- `Code`: GitHub

## Technology
- HTML5, CSS3, Vivify- and Lit CSS Library (frontend)
- Node.js using express (backend)
- NoSQL database
- Spotify API (interface)

## Design
cute design like the glitch page 🎉🎉

## Ideas
- kNN ML for making the user's song cloud more sizable 
- user states mood; 
- based on that parameter we recommend songs 
- mood diagram based on user's mood history 
- saving data and doing some ML with it (maybe with some psychographic things too)
- Chat 
- Social Network structure 
- Page about Songs (and their Params like mood) 

## Flow
- User signs in with Spotify 
- He is redirected to our app and we receive an access token
- He states his mood 
- These parameters are sent to our backend to `/getSongs
- We request his recently played songs and their mood from the Spotify web API
- We choose the best songs that correspond to the user's current mood 
- We send them to the user
- He can select which song he wants to add to his library
- The user can now go into Spotify and listen to the new playlist we have created for him, containing the selected songs
- Enjoy the Music! 😀
