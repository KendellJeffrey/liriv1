

require('dotenv').config();

//npms
const keys = require('./keys'),
      axios = require('axios'),
      moment = require('moment'),
      dotenv = require('dotenv'),
      fs = require("fs");

// getting the args
var command = process.argv[2];
    query = process.argv.slice(3).join(" ");


switch(command){
    case "movie-this":
            ShowMovieInformation(`${query}`);
            break;


}



function ShowMovieInformation(searchedMovie){
    // erroor catch
    if(searchedMovie == ""){
        searchedMovie = "bleach"
    }
    axios
        .get("http://www.omdbapi.com/?t=" + searchedMovie + "&apikey=" + keys.omdbAPIKey)
        .then(function(response) {
            var movieResults = response.data;
            console.log(("LIRI: ") + "Searching for " +  (searchedMovie) + "...");
            console.log(("Title") + movieResults.Title);
            console.log(("Year") + movieResults.Year);
            // gets the rating
            for(var i = 0; i < movieResults.Ratings.length; i++){

                if(movieResults.Ratings[i].Source == "Rotten Tomatoes"){
                    console.log(( movieResults.Ratings[i].Source + " ") + movieResults.Ratings[i].Value)
                }

                if(movieResults.Ratings[i].Source == "Internet Movie Database"){
                    console.log(( movieResults.Ratings[i].Source + " ") + movieResults.Ratings[i].Value)
                }

                
            }
            console.log(("Plot ") + movieResults.Plot);
            console.log(("Country ") + movieResults.Country);
            console.log(("Language ") + movieResults.Language);
            console.log(("Cast ") + movieResults.Actors);
            
            
        })
        .catch(function(error) {
            console.log(error);
        }
    );
}