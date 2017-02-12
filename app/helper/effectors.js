var config = require('../../config.js');

module.exports = function(){

    function isAscii(input){
        return config.regex.ascii.test(input);
    }

    function getEquation(input){
        if(isAscii(input))
            return input.replace(config.regex.filter, "");

        return false
    }

    function infixToPostfix(input){
        var pemdas = config.math.pemdas;
        var operators = config.regex.operators;
        var stack = [];
        input = input.replace(operators,",$1,")
        input = input.split(",");
        
        input = input.filter(function(result){
                return result.trim() != '';
        });
        
        var result = "";

        input.forEach(function(value, key, array){
            if(!(value in pemdas)){
                result = result.concat(value + " ");
            }else{
                if(stack.length == 0){
                    stack.push(value);
                }else if(pemdas[value] == pemdas[stack[stack.length - 1]] ||
                    pemdas[value] > pemdas[stack[stack.length - 1]]){
                    var temp = stack.pop();

                    if(temp != '('){
                        stack.push(temp);
                        result = result.concat(stack.pop() + " ");
                    }else{
                        stack.push(temp);
                    }
                    stack.push(value);
                }else if(value == ')'){
                    result = result.concat(stack.pop() + " ");
                    stack.pop();
                }else{
                    stack.push(value);
                }
            }

            if(key === array.length - 1){
                for(i = 0; i <= stack.length; i++){
                    result = result.concat(stack.pop() + " ");
                }
            }
        });

        return result.trim();
    }

    return{
        isAscii        : isAscii,
        getEquation    : getEquation,
        infixToPostfix : infixToPostfix
    };
}();