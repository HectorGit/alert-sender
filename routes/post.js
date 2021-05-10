const express = require("express");
const postrouter = express.Router();

const query = require(".././tools/queryDatabase");
const qStrings = require(".././tools/sqlStrings");
const val = require(".././tools/validate");
const dbFail = require(".././tools/dbFailSafe");
const moment = require("moment");

const MyController = require('../controllers/myController');


//careful here, include method postrouter.post
postrouter.post("/create_friend",
    MyController.createFriend
);

module.exports = postrouter;