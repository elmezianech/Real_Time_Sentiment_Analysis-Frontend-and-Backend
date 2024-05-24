var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
    tweet_id: Number,
    tweet_content: String,
    entity: String,
    sentiment: String,
    prediction: String
});

var tweetModel = mongoose.model('tweets', tweetSchema);

module.exports = tweetModel;
