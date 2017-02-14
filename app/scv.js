var config = require('../config.js'),
    bodyParser = require('body-parser'),
    request = require('request');

module.exports = function(){

    function pingSCV(){
        var quote = config.scv.ping;
        return quote;
    }

    function callSendAPI(messageData) {
        try{
            request({
                uri: config.facebook.uri,
                qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
                method: 'POST',
                json: messageData

            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var recipientId = body.recipient_id;
                    var messageId = body.message_id;

                    if (messageId) {
                        console.log("Successfully sent message with id %s to recipient %s", 
                        messageId, recipientId);
                    } else {
                        console.log("Successfully called Send API for recipient %s", 
                        recipientId);
                    }
                } else {
                console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
                }
            });
        }catch(e){
            return config.scv.error;
        }
    }
    
    return {
        hello: pingSCV
    };
}();