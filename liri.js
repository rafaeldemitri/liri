var keys = require("./keys");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotifyKeys = require('./spotify.js');
var Request = require('request');
var args = process.argv;
var action = process.argv[2];
var userInput = process.argv[3];
var spotify = new Spotify(spotifyKeys);



if (action === "get-tweets") {
    getTweets();
}

if (action === "spotify") {
    fireSpotify();
}

function getTweets() {


    
    var client = new Twitter(keys.twitterkeys);
    
    client.get('statuses/user_timeline', function(error, tweets, response) {
    if (!error) {
        //console.log(tweets[0].text);
        for (i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
        }
    }
    });

}



function fireSpotify() {
 
spotify.search({ type: 'track', query: userInput }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log(data.tracks.items[0].album.artists[0].name);
console.log(data.tracks.items[0].album.name);
console.log(data.tracks.items[0].name);
console.log(data.tracks.items[0].preview_url);
})
};

var getMovie = function(movieName) {
Request('http://www.omdbapi.com/?t=' + movieName + '&apikey=40e9cece', function (error, response, body) {
  
    var jsonData = JSON.parse(body);

    console.log('Title:' + jsonData.Title);
    console.log('Year:' + jsonData.Year);
    console.log('Rated:' + jsonData.Rated);
    console.log('IMDB Rating:' + jsonData.imdbRating);
});
}

var pick = function(caseData, functionData) {
    switch(caseData) {
        case 'my-tweets' :
            getTweets();
            break;
        default:
        console.log('LIRI does not know that');
        case 'movie-this' :
            getMovie(functionData);
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};



runThis(process.argv[2], process.argv[3]);