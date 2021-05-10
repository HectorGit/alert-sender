const express = require("express");
const postrouter = express.Router();

// const query = require(".././tools/queryDatabase");
// const qStrings = require(".././tools/sqlStrings");
// const val = require(".././tools/validate");
// const dbFail = require(".././tools/dbFailSafe");
// const moment = require("moment");

// const MyController = require('../controllers/myController');

//careful here, include method postrouter.post
// postrouter.post("/create_friend",
//     MyController.createFriend
// );


//setup transport


// postrouter.post('/email_ecom_down', 
// async(req,res) =>{
//     console.log('sending email_ecom_down...')

//     //setup sending email w transport 
// })

// postrouter.post('/email_api_down', 
// async(req,res) =>{
//     console.log('sending email_api_down...')

//     //setup sending email w transport 
// })


module.exports = postrouter;