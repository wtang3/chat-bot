var config = require('../../config.js'),
    math = require('mathjs');

module.exports = function(){

    function isAscii(input){
        return config.regex.ascii.test(input);
    }

    function getEquation(input){
        if(isAscii(input))
            return input.replace(config.regex.filter, "");

        return false
    }

    function computeAnswer(input){
        return math.eval(input);
    }
    

    return{
        isAscii        : isAscii,
        getEquation    : getEquation,
        computeAnswer  : computeAnswer
    };
}();