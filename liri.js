//PSEUDOCODE
//At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.

//COMMANDS NEEDED
//node liri.js my-tweets
	//displays last 20 tweets and their timestamp

//node liri.js spotify-this-song '<song name here>'
	//output song info:
	//Artist(s)
	// The song's name
	// A preview link of the song from Spotify
	// The album that the song is from
	//if no song, then "The Sign" by Ace of Base

// node liri.js movie-this '<movie name here>'
	//Output:
   // * Title of the movie.
   // * Year the movie came out.
   // * IMDB Rating of the movie.
   // * Country where the movie was produced.
   // * Language of the movie.
   // * Plot of the movie.
   // * Actors in the movie.
   // * Rotten Tomatoes Rating.
   // * Rotten Tomatoes URL.
//if no movie given, Mr. Nobody

// node liri.js do-what-it-says
	//Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
	// Feel free to change the text in that document to test out the feature for other commands.

// ** BONUS **

//Create a log of the data in log.txt -- append each command, don't overwrite.

//this section is grabbing all of the 'external' libraries and other stuff to be used in this app
var fs = require('fs');
var request = require('request');
var twitterKeys = require('./keys.js').twitterKeys;

// creating the variables that will identify the user input
//action identifies what we're doing with the input, value is the input to be plugged in

var action = process.argv[2];
var value = process.argv[3];

function movieThis (value) {

};


/*USER INTERACTION */ 
// Below switch will listen to what the user inputs and run the correct function for each
switch (action) {
	case 'my-tweets':
	// this will link to function that will log the last 20 tweets
	console.log('no tweets to see yet! ');
	break;

	case 'spotify-this-song':
	//will run a function to list spotify songs
	console.log('no music yet!');
	break;

	case 'movie-this':
	//will run a function to list movie data
	console.log('no movies yet!');
	break;

	case 'do-what-it-says':
	//will run the "i want it that way" nonsense
	console.log('what it says');
}

