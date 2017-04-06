// LIRI.JS =============================================================================
/*PSEUDOCODE
 
** BONUS **

Create a log of the data in log.txt -- append each command, don't overwrite.
*/

// basic code structure: an inquirer prompt at the bottom takes in user input through multiple choice. That input is then used to run the appropriate function via a switch.
//Here we go!

// =============================================================================

//"At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable."
//this section is grabbing all of the 'external' libraries and other stuff to be used in this app
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var twitterKeys = require('./keys.js').twitterKeys;
var spotify = require('spotify');
var inquirer = require('inquirer');


// =============================================================================
//FUNCTIONS//
//These are the functions the switch (below) refers to after the inital inquirer prompt.
// =============================================================================

// MYTWEETS --------------------------
/* node liri.js my-tweets
	displays last 20 tweets and their timestamp
*/

// NOTE TO SELF -- limit tweets to 20
function myTweets() {

	var client = new Twitter(twitterKeys);

	client.get('statuses/user_timeline', function(err, tweets, response) {
		if ( err ) {
		    console.log('Error occurred: ' + err);
		    return;
		} else {
		    console.log('Most recent tweets from ' + tweets[0].user.name +':');

		    for (var i = 0; i < tweets.length; i++) {
		    	console.log('---');
		    	console.log('At ' + tweets[i].created_at + ':');
				console.log(tweets[i].text);
		    };
		}; 
	});
}



// SPOTIFYTHIS --------------------------

/*node liri.js spotify-this-song '<song name here>'
	output song info:
	Artist(s)
	The song's name
	A preview link of the song from Spotify
	The album that the song is from
	if no song, then "The Sign" by Ace of Base 
*/
function spotifyThisSong (song) {

	//creating function that will run and return search query.
	function searchSong (song) {
		spotify.search({ type: 'track', query: song}, function(err, data) {
    
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    } else {
		    	console.log('Song Title: ' + data.tracks.items[0].name);
		    	console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
		    	console.log('Album: ' + data.tracks.items[0].album.name);
		    	console.log('Preview Link: ' + data.tracks.items[0].preview_url);
		    };

		});	
	}

	//check to see if we have already received a song title (like from the text file)
	//if not, inquirer will ask for one and run searchSong
	if (song == undefined) {
			inquirer.prompt([
		{
			type: 'input',
			message: 'What song do you want to know about?',
			name: 'song',
			default: 'The Sign'
		}
	]).then(function(input) {
		var newSong = input.song;
		searchSong(newSong);
	});	
	} else {
		searchSong(song);
	}


};

//MOVIETHIS ---------------------------------------

/* from homework instructions:
node liri.js movie-this '<movie name here>'
	Output:
   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.
   * Rotten Tomatoes Rating.
   * Rotten Tomatoes URL.
if no movie given, Mr. Nobody
*/

//asks the user to identify the movie first.
function movieThis (movie) {
	//creating function that will run the search query and display results.
	function searchMovie (movie) {
		var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
		//if we have a successful query, all the movie's info is listed:
		request(queryUrl, function(error,response,body) {
			if (!error && response.statusCode === 200) {
				console.log(JSON.parse(body).Title);
				console.log('Release date: ' + JSON.parse(body).Year);
				console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
				console.log('Made in: ' + JSON.parse(body).Country);
				console.log('Language: ' + JSON.parse(body).Language);
				console.log('Plot: ' + JSON.parse(body).Plot);
				console.log('Actors: ' + JSON.parse(body).Actors);
				// console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).imdbRating);
				// console.log('Rotten Tomatoes URL: ' + JSON.parse(body).imdbRating);
			};
		});
	}

	//checking to see if a movie has already been received.
	//if not, inquirer will ask for one then run the search.
	if (movie == undefined) {
			inquirer.prompt([
		{
			type: 'input',
			message: 'What movie do you want to know about?',
			name: 'movie',
			default: 'Mr. Nobody'
		}
	]).then(function(input) {
		var newMovie = input.movie;
		searchMovie(newMovie);
	});	
	} else {
		searchSong(movie);
	}
};

//DOWHATITSAYS ---------------------------------------
/*
node liri.js do-what-it-says
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Feel free to change the text in that document to test out the feature for other commands.
*/

function doWhatItSays() {
	fs.readFile('random.txt', 'utf8', function(error, data) {
		 if ( error ) {
			console.log('Error occurred: ' + error);
			return;
		} else {
			// console.log(data);
			//splitting the info into an array for easier access.
			var dataArray = data.split(',');

			//Putting this switch in as a workaround for the silly constraints of this assignment.
			//since i chose to use inquirer instead of process.argv to collect data, 
			//the spotify-this-song command in the text file is useless 
			//because that's in the instructuions based on the premise that i'm using a completely different method to collect data.
			//This is admittedly a clunky solution to a clunky problem.

			switch (dataArray[0]) {
			case 'my-tweets':
			myTweets();
			break;

			case 'spotify-this-song':
			spotifyThisSong(dataArray[1]);
			break;

			case 'movie-this':
			movieThis(dataArray[1]);
			}
		}
	});
};



// =============================================================================
//USER INPUT//
// =============================================================================
//setting up the user prompts using inquirer.
// will have the user select from a list first.
//if the action requires additional input, inquirer will call for it.
//then whatever action is needed will run
//liri will ask the question again maybe?

inquirer.prompt([

{
	type: 'list',
	message: 'Hello, friend. What would you like to do?',
	choices: ['look at some tweets', 
			'find info on a song', 
			'find info on a movie', 
			'do what it says'],
	name: 'action'
}

]).then(function(user) {

	// console.log(user.action);

	switch (user.action) {
	case 'look at some tweets':
	// this will link to function that will log the last 20 tweets
	myTweets();
	break;

	case 'find info on a song':
	//will run a function to list spotify songs
	spotifyThisSong();
	break;

	case 'find info on a movie':
	//runs the movieThis function above, which asks for a movie
	//then searches OMDB and returns info on the movie.
	movieThis();
		
	break;

	case 'do what it says':
	//will run the "i want it that way" nonsense
	doWhatItSays();
	}

});



