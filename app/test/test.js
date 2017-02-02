var assert = require('chai').assert,
    expect = require('chai').expect,
    scv    = require('../scv.js');

describe('Initial test', function(){
    it('1+1 should be 2', function(){
        assert.equal(1+1, 2, 'The answer should be 2')
    });

    it('Scv should respond', function(){
        var result = scv.hello();
        expect(result).to.be.not.null;
    });

    it('Scv should respond with a "What\'s going on? SCV ready."', function(){
        var result = scv.hello();
        assert.equal(result,"What's going on? SCV ready.", "Should say What's going on? SCV ready.");
    });
});
