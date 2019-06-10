const DATAPATH = "D:/Workspace/offline/data.json";
const UPLOADPATH = "D:/Workspace/offline/retailgyan/src/assets";
const MODELSERVICE = "http://localhost:5000/retailGyan/api/v1.0/predict";

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
const path = require("path");
const upload = multer({
    dest: UPLOADPATH
  });
var cors = require('cors')
var app = express();
var request = require('request');


app.use(cors())
app.use(bodyParser.json()); 
app.use(express.static("dist/retailgyan")); 

app.listen(8080, '0.0.0.0');
app.get('/data', function (req, res) {
      let filePath = DATAPATH;
      fs.readFile(filePath, function(err, data) {
        if (err)
            return console.log(err);
        res.send(JSON.parse(data));
      });      
  })
app.post('/image/:name',  upload.single("file"), (req, res) => {    
  const tempPath = req.file.path;
  const targetPath = path.join(path.dirname(req.file.path), "./"+req.params["name"]);
  fs.rename(tempPath, targetPath, err => {
    if (err) {
      console.log(err)
      return;
    }
    data = {
      "imgPath" : targetPath
    }
    triggerModelService(data);
    console.log("outter");
    res.status(200)
      .contentType("text/plain")
      .end("File uploaded!");
  });
});

  function triggerModelService(postData){
    var clientServerOptions = {
        uri: MODELSERVICE,
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, response) {
        console.log(error,response);        
    });
}
console.log("Listening on port 8080");