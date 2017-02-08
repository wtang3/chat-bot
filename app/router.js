var express = require('express'),
    router = express.Router(),
    scv = require('./scv.js'),
    bodyParser = require('body-parser'),
    request = require('request'),
    path = __dirname + '/dist/';

    // Use dotenv if Dev.
    if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// Main page
router.get('/', function(req, res){
    try{
        res.sendFile(path + "index.html");
    }catch(e){
        res.send("Uh oh 4xx it's probably your fault.");
    }

});

// Ping endpoint
router.get('/api/ping', function(req, res){
    try{
        var message = scv.hello();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ response: message }));
    }catch(e){
        res.send(JSON.stringify({ response: "Uh oh SCV died for some reason." }));
    }
});

// Webhook endpoint
router.get('/api/webhook', function(req, res){
    try{
        // Verification
        if (req.query['hub.verify_token'] === process.env.VERIFY_ACCESS_TOKEN) {
            res.send(req.query['hub.challenge'])
        }
        res.send(JSON.stringify({ response: "Failed verification"}))

    }catch(e){
        res.send(JSON.stringify({ response: "Uh oh you did something wrong."}));
    }
});

module.exports = router;