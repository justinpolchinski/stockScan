
require("dotenv").config();



//var params = {user_id: '0utDoorsForLife'};
var Twitter = require('twitter');
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET

});
//var params = {user_id: "@realDonaldTrump"};
console.log("tweets.js");
module.exports ={
trump: function(req,res){
    console.log("Trump hit");
var tweetsUrl = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump&count=5';

   client.get(tweetsUrl, 
       function (error, tweets, response) {
       var tweetsString = '';
        
       if (!error) {
           console.log("no error");
           tweetsString = '\n';
           for (var i = 0; i < tweets.length; i++) {
               tweetsString += tweets[i].text + '\n';
           }
           
           console.log(tweetsString+"\n");
           res.json( tweets);
           
       }
       else {
           console.log('ERROR: ' + error);
           console.log(error);
       }
   })
}
}

//   module.exports = tweetsUrl;
  
  