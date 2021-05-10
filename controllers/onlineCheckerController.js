
// const qStrings = require(".././tools/sqlStrings");
// const query = require(".././tools/queryDatabase");
// const dbFail = require(".././tools/dbFailSafe");
// const moment = require("moment");

const nodemailer = require("nodemailer");   
const axios = require('axios');

// const dummy_ecom_axios_instance = axios.create({
//     baseURL : 'localhost:5000'
// })

// const dummy_api_axios_instance = axios.create({
//     baseURL : 'localhost:5001'
// })

const ecom_axios_instance = axios.create({
    // baseURL : 'https://www.ergonomyx.com'
    baseURL : 'https://ergonomyx-ecommerce.herokuapp.com'
})

const api_axios_instance = axios.create({
    baseURL : 'https://ergonomyx-api.herokuapp.com'
})

//declare the email transport here 
var transporter = nodemailer.createTransport({
    host: "smtp.ionos.com",
    port:587,
    secure:false,
    auth:{
        user: "hello@ergonomyx.ca",
        pass: "Iboard2018!"
    }
});

function send_email_ecom_down(){

    console.log('send_email_ecom_down')
    //use email transport to send the email 

    const mailOptions = {
        from: '"Ergonomyx Technologies Canada Inc." <hello@ergonomyx.ca>',
        to: ['hectorandres.pv@ergonomyx.com'], //could be devteam 
        subject: 'ECOM is down',
        text: 'The Ecom site appears to be down' 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.status(400).send('Error send_email_ecom_down');
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).send(info.response);
        }
    });


}

function send_email_api_down(){
    console.log('send_email_api_down')
    //use email transport to send the email 

    const mailOptions = {
        from: '"Ergonomyx Technologies Canada Inc." <hello@ergonomyx.ca>',
        to: ['hectorandres.pv@ergonomyx.com'], //could be devteam 
        subject: 'API is down',
        text: 'The Api site appears to be down' 
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.status(400).send('Error send_email_api_down');
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).send(info.response);
        }
    });

}

module.exports = {

    checkSitesAreUp : async(req,res) => {

        //--------------------- check that ECOM is up (first axios instance)
        //if not - send email notifying
        console.log('\n ---- checking that ecom is up : ')

        //dummy_ecom_axios_instance.get('/')
        ecom_axios_instance.get('/')
        .then(async function(response){
            console.log('ecom response status: \n', response.status)
            //if the response status is not good, 
            //console.log('send_email_ecom_down')
            // send_email_ecom_down()
            //don't return after execution, just continue !
        })
        .catch(async function(error){
          console.log('error checking ecom endpoint with axios')
        //   console.log('ecom error: \n ', error)
            console.log('ecom error.response.status \n ' , error.response.status)
        })

        //--------------------- check that API is up (second axios instance)
        //if not - send email notifying
        console.log('\n ----checking that api is up : ')

        //dummy_api_axios_instance.get('/')
        api_axios_instance.get('/')
        .then(async function(response){
            console.log('ecom response status: \n', response.status)
            //if the response status is not good, 
            //console.log('send_email_api_down')
            // send_email_api_down()
            //don't return after execution, just continue !
        })
        .catch(async function(error){
          console.log('error checking ecom endpoint with axios')
        //   console.log('api error: \n ', error)
          console.log('api error.response.status \n ' , error.response.status)

        })

        //sending respective emails if either is failing 
        //console.log('sending emails : ')

        //finally return. 
        console.log('\n ---- process completed, returning ... ')
        return;
    }

}