
const express = require("express");
const getrouter = express.Router();

const query = require(".././tools/queryDatabase");
const qStrings = require(".././tools/sqlStrings");
const val = require(".././tools/validate");
const dbFail = require(".././tools/dbFailSafe");
const moment = require("moment");

const MyController = require('../controllers/myController');
//let MyController = "../controllers/myController" 

getrouter.get("/", (req, res) => {
    return res.send("Welcome to Hector\'s Practice API! 🌝");

});

//careful here ! i had getrouter.route so it didn't work !
//also don't encapsule in async when using controller!
// getrouter.get("/read_friend", async(req,res)=>{
//     MyController.readFriend
// });
getrouter.get("/read_friend", 
    MyController.readFriend
);

getrouter.get("/read_all_friends", 
    MyController.readAllFriends
);

module.exports = getrouter;