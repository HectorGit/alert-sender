/********************
 **** CRON JOBS *****
 ********************/
// ALL CRON JOBS SHOULD BE FOUND AND IMPLEMENTED IN THIS FILE
// Node-Scheduler in UTC Time --> 7:00pm UTC == 1:00pm Local Time (6hr Offset)

var schedule = require("node-schedule");

var onlineCheckerController = require("./controllers/onlineCheckerController");

module.exports = {

    // this is here to help you test, just add it in index.js when you are going to test. (below the other existing cron jobs. )
    check_sites_are_up() {
        schedule.scheduleJob("*/1 * * * *", function () { 
            //post anything you want to test here, and it'll execute every minute. 
            console.log('Alert Sender - cron job called !')
            onlineCheckerController.checkSitesAreUp();
        });
    },

}
