var express = require('express');
    app = express(),
    scv = require('./app/scv.js');


var port = 3000;

// Main page
app.get('/', function(req, res){
    try{
        var message = scv.hello();
        res.send(message);
    }catch(e){
        res.send("Uh oh SCV died for some reason.");
    }
});

app.listen(port,function(){
    console.log('App started on port ' + port);
});