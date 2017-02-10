var express = require('express'),
    router = express.Router(),
    scv = require('./scv.js'),
    bodyParser = require('body-parser'),
    request = require('request'),
    path = __dirname + '/dist/',
    config = require('../config.js');

    // Use dotenv if Dev.
    if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// Main page
router.get('/', function(req, res){
    var error = config.scv.error3;
    try{
        res.sendFile(path + "index.html");
    }catch(e){
        res.send(error3);
    }

});

// Ping endpoint
router.get('/api/ping', function(req, res){
    var error = config.scv.error;
    try{
        var message = scv.hello();
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ response: message }));
    }catch(e){
        res.send(JSON.stringify({ response: error }));
    }
});

// Webhook endpoint
router.get('/api/webhook', function(req, res){
    var error = config.scv.error2;
    var veriError = config.facebook.verificationError;
    try{
        // Verification
        if (req.query['hub.verify_token'] === process.env.VERIFY_ACCESS_TOKEN) {
            res.send(req.query['hub.challenge'])
        }
        res.send(JSON.stringify({ response: veriError }));

    }catch(e){
        res.send(JSON.stringify({ response: error}));
    }
});

module.exports = router;