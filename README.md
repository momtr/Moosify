# Moodify

Welcome to our web app ;) <br />
🎉💿🎵

## Topic - Moodify
We want to create a webapplication which uses the Spotify Web API to recommend songs based on the users mood which he states when opening the page as well as implementing a mood diagram based on the users "mood history".
<br /><br />Link to the web app: [Moodify](https://moodify2.glitch.me/)

## Kickoff
2020-02

## Team
Cien, Alex, Moritz 

## Setup
- `Server`: glitch.me 
- `Code`: github (Branch Glitch!!!)

## Technology
- React.js (frontend; grommet library)
- Node.js using express (backend)
- MySQL database
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
- he is redirected to our app and we receive a token (`user_uri`)
- he states his mood 
- those Params are sent to our backend to `/getSongs`
- we request his songs and their mood from the Spotify web API
- we choose the best songs that correspond to the user's current mood 
- we send them to the user
- he can play them in the web app using the Spotify player widget 
