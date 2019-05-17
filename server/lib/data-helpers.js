"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const sortNewestFirst = function(a, b){
  return  b.created_at - a.created_at
};
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweets').insertOne(newTweet).then(function(res){
        callback(null, true)
      });
    },

    // Get all tweets in `db`, sorted by newest first
    
    getTweets: function(callback) {

        db.collection('tweets',function(err,res){
          res.find(function(err,res){
            res.toArray(function(err,result){
              callback(null, result.sort(sortNewestFirst))
            })
          })
        })
          
    }
  };
}
