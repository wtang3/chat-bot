var chai     = require('chai'),
    assert   = require('chai').assert,
    expect   = require('chai').expect,
    scv      = require('../scv.js'),
    chaihttp = require('chai-http'),
    should   = chai.should(),
    config   = require('../../config.js');
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

describe('Ensure config file is valid', function(){
    it('Config file should be populated', function(){
        expect(config).to.be.not.null;
    });

    it('Check config.scv', function(){
        expect(config.scv).to.be.not.null;
    });

    it('Check config.facebook', function(){
        expect(config.scv).to.be.not.null;
    });
});


describe('/GET ping', function(){
    it('Ping should respond with a whats going on? scv ready.', function(done){
        chai.request(server)
            .get("/api/ping")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                assert.equal(res.body.response,"What's going on? SCV ready.", "Should say What's going on? SCV ready.");
              done();
            });
    });
});
