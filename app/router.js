var express = require('express'),
    router = express.Router(),
    scv = require('./scv.js'),
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

// Facebook verification
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

// Webhook endpoint
router.post('/api/webhook', function(req, res){
    try{
        var data = req.body;
        
        // Ensure page subscription
        if(data.object == 'page'){
            data.entry.forEach(function(entry){
                entry.messaging.forEach(function(messagingEvent) {
                   
                });    
            });
        }
        res.sendStatus(200);
    }catch(e){
        res.sendStatus(500);
    }
});

module.exports = router;