"use strict";

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
        console.error(`Failed to connect: ${MONGODB_URI}`);
        throw err;
    }

    console.log(`Connected to mongodb: ${MONGODB_URI}`);

    // function callback(err, tweets) {
    //     if(err) throw err;
    //     console.log("loggin each tweet:")
    //     for (let tweet of tweets) {
    //         console.log(tweet);
    //     }
    // }

    // function getTweets(callback){
    //     db.collection("tweets").find().toArray((err, tweets) => {
    //         if (err) {
    //             return callback(err)
    //         }
    //         callback(null, tweets);
    //     });
    // }

    function getTweets(callback) {
        db.collection("tweets").find().toArray(callback);
    }

    getTweets((err, tweets) => {
        if(err) throw err;

        console.log("Logging each tweet:");
        for (let tweet of tweets) {
            console.log(tweet);
        }

        //close database comment line
        db.close();
    });


});


