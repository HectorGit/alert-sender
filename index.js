var express = require('express');
var app = express();
var path = require("path");//this is strange, not sure if we have to get this installed
const bodyParser = require('body-parser')//not sure what this is for but definitely needed.
var port =  process.env.PORT || 5001;
//global.app_root = path.resolve(__dirname);//this is strange.
//think it has to do with the app knowing where the root directory is.

//console.log('global.app_root: ', global.app_root)

router = express.Router();
app.use(router);//this is also strange
//think it has to do with creating routes

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
})) //this is also strange
//think it has to do with parsing responses

app.use(express.json());

app.use(express.static('public'));

// app.use("/", require("./routes/get"));
// app.use("/", require("./routes/post"));
// app.use("/", require("./routes/patch"));
// app.use("/", require("./routes/delete"));

app.get('/', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'public/html/index.html'));
});

app.listen(port);

console.log('my Node server started on : ' + port)