var chai     = require('chai'),
    assert   = require('chai').assert,
    expect   = require('chai').expect,
    scv      = require('../scv.js'),
    chaihttp = require('chai-http'),
    should   = chai.should(),
    server   = require('../../app.js');

    chai.use(chaihttp);


describe('Initial test', function(){
    it('1+1 should be 2', function(){
        assert.equal(1+1, 2, 'The answer should be 2')
    });

    it('Scv should respond', function(){
        var result = scv.hello();
        expect(result).to.be.not.null;
    });

    it('Scv should respond whats going on? scv ready.', function(){
        var result = scv.hello();
        assert.equal(result,"What's going on? SCV ready.", "Should say What's going on? SCV ready.");
    });
});

describe('/GET ping', function(){
    it('Ping should respond with a whats going on? scv ready.', function(done){
        chai.request(server)
            .get("/ping")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                assert.equal(res.body.response,"What's going on? SCV ready.", "Should say What's going on? SCV ready.");
              done();
            });
    });
});
