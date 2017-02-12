var chai     = require('chai'),
    assert   = require('chai').assert,
    expect   = require('chai').expect,
    scv      = require('../scv.js'),
    chaihttp = require('chai-http'),
    should   = chai.should(),
    config   = require('../../config.js'),
    effector = require('../helper/effectors.js'),
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

describe('Helper effectors.js (isAscii)', function(){
    it('Verify string (whats 1+1) is ascii', function(){
        var input = "what's 1+1";
        var result = effector.isAscii(input);
        assert.isTrue(result);
    });

    it('Verify string (嗨，我喜歡藍色的顏色) is NOT ascii', function(){
        var input = "嗨，我喜歡藍色的顏色";
        var result = effector.isAscii(input);
        assert.isFalse(result);
    });

    it('Verify string (Hi Unë si blu ngjyra) is NOT ascii', function(){
        var input = "Hi Unë si blu ngjyra";
        var result = effector.isAscii(input);
        assert.isFalse(result);
    });

    it('Verify string (Привет мне нравится синий цвет) is NOT ascii', function(){
        var input = "Привет мне нравится синий цвет";
        var result = effector.isAscii(input);
        assert.isFalse(result);
    });
});

describe('Helper effectors.js (getEquation)', function(){
    it('whats 1+1 returns 1+1', function(){
        var input = "what's 1+1";
        var result = effector.getEquation(input);
        assert.equal(result,"1+1");
    });

    it('Can you tell me what is 3*1+4-6 returns 3*1+4-6', function(){
        var input = "Can you tell me what is 3*1+4-6";
        var result = effector.getEquation(input);
        assert.equal(result,"3*1+4-6");
    });

     it('Can you tell me what is (1+2)*6/2 please? return (1+2)*6/2', function(){
        var input = "Can you tell me what is (1+2)*6/2 please?";
        var result = effector.getEquation(input);
        assert.equal(result,"(1+2)*6/2");
    });
});

describe('Helper effectors.js (computeAnswer)', function(){
    it('(1+2)^2 should return 9', function(){
        var input = "(1+2)^2";
        var result = effector.computeAnswer(input);
        assert.equal(result,"9");
    });
    
    it('12+60-23 should return 49', function(){
        var input = "12+60-23";
        var result = effector.computeAnswer(input);
        assert.equal(result,"49");
    });

    it('(5 + 3) * 12 / 3 should return 32', function(){
        var input = "(5 + 3) * 12 / 3";
        var result = effector.computeAnswer(input);
        assert.equal(result,"32");
    });

    it('1*2^2/6 should return  0.6666666666666666', function(){
        var input = "1*2^2/6";
        var result = effector.computeAnswer(input);
        assert.equal(result,"0.6666666666666666");
    });
    it('2*2+1*+2 should fail', function(){
        var input = "2*2+1+*2";
        var result = effector.computeAnswer(input);
        assert.equal(result, config.scv.error4);
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
