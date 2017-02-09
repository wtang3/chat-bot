var config = require('../config.js');

module.exports = function(){

    function pingSCV(){
        var quote = config.scv.ping;
        return quote;
    }
    
    return {
        hello: pingSCV
    };
}();