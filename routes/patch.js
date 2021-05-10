const express = require("express");
const patchrouter = express.Router();

const query = require(".././tools/queryDatabase");
const qStrings = require(".././tools/sqlStrings");
const val = require(".././tools/validate");
const dbFail = require(".././tools/dbFailSafe");
const moment = require("moment");

const MyController = require('../controllers/myController');

patchrouter.patch("/update_friend",
    MyController.updateFriend
);

module.exports = patchrouter;