const express = require("express");
const path =require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
var cheerio = require("cheerio");
var Twit = require("twit");
var Twitter = require("twitter");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stockScan_db");
console.log("Stock Scan!!!")
///////////////////////////////

// var keys = require("./tweets/keys.js");
// var Twitter = require('twitter');
// var client = new Twitter({
//   consumer_key: process.env.TWITTER_CONSUMER_KEY,
//   consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
//   access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
// });
// var params = {user_id: "@realDonaldTrump"};
// console.log("tweets.js");
// var tweetsUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump&count=5';
//    client.get(tweetsUrl,
//        function (error, tweets, response) {
//        var tweetsString = '';

//        if (!error) {
//            tweetsString = '\n';
//            for (var i = 0; i < tweets.length; i++) {
//                tweetsString += tweets[i].text + '\n';
//            }
//            console.log(tweetsString);
//            console.log(tweetsString);
//        }
//        else {
//            console.log('ERROR: ' + error);
//            console.log(error);
//        }
//    });


/////////////////////////////////
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
