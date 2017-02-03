var express = require('express');
    app = express(),
    scv = require('./app/scv.js');
    path = __dirname + '/app/dist/';

var port = 3000;

app.use(express.static(__dirname + '/app/dist'));

// Main page
app.get('/', function(req, res){
    try{
        res.sendFile(path + "index.html");
    }catch(e){
        res.send("Uh oh 4xx");
    }

});

app.get('/ping', function(req, res){
    try{
        var message = scv.hello();
        res.send(message);
    }catch(e){
        res.send("Uh oh SCV died for some reason.");
    }
})

app.listen(port,function(){
    console.log('App started on port ' + port);
});