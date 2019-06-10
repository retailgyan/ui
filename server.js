var express = require('express');
var app = express();
app.use(express.static("dist/retailgyan")); 
app.listen(8080, '0.0.0.0');
console.log("Listening on port 8080");