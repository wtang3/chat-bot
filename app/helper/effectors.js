var config = require('../../config.js');

module.exports = function(){
    
    function isAscii(input){
       return config.regex.ascii.test(input);
    }

    function getEquation(input){
        if(isAscii(input))
            return input.replace(config.regex.filter,"");
        
        return false
    }
    
    return {
        isAscii: isAscii,
        getEquation : getEquation
    };
}();