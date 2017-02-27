var config = require('../../config.js'),
  math = require('mathjs');

module.exports = function () {

  function isAscii(input) {
    return config.regex.ascii.test(input);
  }

  function getEquation(input) {
    if (isAscii(input))
      return input.replace(config.regex.filter, "");

    return false
  }

  // This is a bit slow, might try to refactored logic at a later time.
  function computeAnswer(input) {
    try {
      return math.eval(input);
    } catch (e) {
      // possibly add some logging on what came in.
      // log(e,input);
      return config.scv.error4;
    }
  }


  return {
    isAscii: isAscii,
    getEquation: getEquation,
    computeAnswer: computeAnswer
  };
}();
