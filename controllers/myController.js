
const qStrings = require(".././tools/sqlStrings");
const query = require(".././tools/queryDatabase");
const dbFail = require(".././tools/dbFailSafe");
const moment = require("moment");//used for timestamp

module.exports = {

    //GET
    /* requires body such as
    { 
        first_name
    }
    */
    readFriend : async(req,res) => {
        console.log('reading friend...')
        b = req.body
        p = req.params
        console.log('b: ',b)       
        console.log('p: ',p)
        const text = qStrings.readFriend;
        const values = [b.first_name];
        query(text, values, (err, result) => {
            if (err) return dbFail.failSafe(err, res);
            console.log(result.rows)
            return res.status(200).send(result.rows);
        });
    },

    readAllFriends : async(req,res) => {
        console.log('reading friends...')
        const text = qStrings.readAllFriends;
        //const values = [b.first_name];
        const values = [];
        query(text, values, (err, result) => {
            if (err) return dbFail.failSafe(err, res);
            console.log(result.rows)
            return res.status(200).send(result.rows);
        });
    },

    //POST
    /* requires body such as
    { 
        first_name,
        last_name,
        age
    }
    */
    createFriend : async(req,res) => {
        b = req.body
        const text = qStrings.createFriend;
        const values = [b.first_name, b.last_name, b.age, moment()];
        query(text, values, (err, result) => {
            if (err) return dbFail.failSafe(err, res);
            return res.status(200).send('successfully created friend');
        });
    },

    //PATCH
    /* requires body such as
    { 
        first_name
        age
    }
    */
    updateFriend : async(req,res) => {
        b = req.body
        const text = qStrings.updateFriend;
        const values = [b.first_name, b.age];
        query(text, values, (err, result) => {
            if (err) return dbFail.failSafe(err, res);
            //console.log(result.rows)
            return res.status(200).send('successfully updated friend');
        });
    },

    //DELETE
    /* requires body such as
    { 
        first_name
    }
    */
    deleteFriend : async(req,res) => {
        b = req.body
        const text = qStrings.deleteFriend;
        const values = [b.first_name];
        query(text, values, (err, result) => {
            if (err) return dbFail.failSafe(err, res);
            //console.log(result.rows)
            return res.status(200).send('successfully deleted friend');
        });
    },


}