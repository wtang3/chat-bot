var config = {};

// Hello SCV
config.scv = {
    ping   : "What's going on? SCV ready.",
    error  : "Uh oh SCV died for some reason.",
    error2 : "Uh oh you did something wrong.",
    error3 : "Uh oh 4xx it's probably your fault."
};

config.facebook = {
    verificationError : "Failed verification"
};

config.regex = {
    ascii     : /^[\x00-\x7F]*$/,
    filter    : /[a-zA-Z'|,.@#$`";{}\\= _?<>~]*/g
}

module.exports = config;