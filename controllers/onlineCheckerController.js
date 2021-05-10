
// const qStrings = require(".././tools/sqlStrings");
// const query = require(".././tools/queryDatabase");
// const dbFail = require(".././tools/dbFailSafe");
// const moment = require("moment");

const nodemailer = require("nodemailer");   
const axios = require('axios');

// const dummy_ecom_axios_instance = axios.create({
//     baseURL : 'http://127.0.0.1:5000'
// })

// const dummy_api_axios_instance = axios.create({
//     baseURL : 'http://127.0.0.1:5001'
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
        text: 'The Ecom site appears to be down,  also check app logs for false positives \n https://ergonomyx-ecommerce.herokuapp.com' 
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
        text: 'The Api site appears to be down, also check app logs for false positives \n https://ergonomyx-api.herokuapp.com' 
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

        //---DUMMY ECOM --- TEST LOCAL 
        // console.log('\n ---- checking that ecom is up : ')

        // dummy_ecom_axios_instance.get('/')
        // .then(async function(response){
        //     console.log('dummy ecom response status: \n', response.status)
        //     if(response.status != 200){
        //         console.log('dummy ecom - endpoint success, but status isn\'t 200')
        //     }
        // })
        // .catch(async function(error){
        //     console.log('error checking ecom endpoint with axios')

        //     if(error.response){
        //         console.log('dummy ecom error.response.status \n ' , error.response.status)
        //         send_email_ecom_down()
        //     }else{
        //         console.log('dummy ecom there was no response, sending email... \n ')
        //         send_email_ecom_down()
        //     }
        // })

        //---DUMMY API --- TEST LOCAL 
        // console.log('\n ---- checking that ecom is up : ')
        // console.log('\n ----checking that api is up : ')

        // dummy_api_axios_instance.get('/')
        // .then(async function(response){
        //     console.log('dummy ecom response status: \n', response.status)
        //     if(response.status != 200){
        //         console.log('dummy api - endpoint success, but status isn\'t 200')
        //     }
        // })
        // .catch(async function(error){
        //   console.log('error checking ecom endpoint with axios')
        //     if(error.response){
        //         console.log('dummy api error.response.status \n ' , error.response.status)
        //         send_email_api_down()
        //     }else{
        //         console.log('dummy api there was no response, sending email... \n ')
        //         send_email_api_down()
        //     }
        // })

        //dummy_ecom_axios_instance.get('/')
        console.log('\n ---- checking that ecom is up : ')

        ecom_axios_instance.get('/')
        .then(async function(response){
            console.log('ecom response status: \n', response.status)
            if(response.status != 200){
                console.log('ecom - endpoint success, but status isn\'t 200')
            }
        })
        .catch(async function(error){
          console.log('error checking ecom endpoint with axios')
        //   console.log('ecom error: \n ', error)
            if(error.response){
                console.log('ecom error.response.status \n ' , error.response.status)
                send_email_ecom_down()
            }else{// no response received, just error ocurred. 
                console.log('ecom there was no response, sending email... \n ')
                send_email_ecom_down()
            }
        })

        //--------------------- check that API is up (second axios instance)
        //if not - send email notifying
        console.log('\n ----checking that api is up : ')

        //dummy_api_axios_instance.get('/')
        api_axios_instance.get('/')
        .then(async function(response){
            console.log('ecom response status: \n', response.status)
            if(response.status != 200){
                console.log('api - endpoint success, but status isn\'t 200')
            }
        })
        .catch(async function(error){
          console.log('error checking ecom endpoint with axios')
        //   console.log('api error: \n ', error)
            if(error.response){
                console.log('ecom error.response.status \n ' , error.response.status)
                send_email_api_down()
            }else{// no response received, just error ocurred. 
                console.log('ecom there was no response, sending email... \n ')
                send_email_api_down()
            }
        })

        //sending respective emails if either is failing 
        //console.log('sending emails : ')

        //finally return. 
        console.log('\n ---- process completed, returning ... ')
        return;
    }

}