var assert = require('assert');
var yphase = require('../index');

describe('yphase', function() {
    it('should process a single file', function(done) {
        yphase(__dirname + '/fixtures/test1.yml', 'configure', function(err, result) {
            assert.ifError(err);
            assert.equal(result, 'echo \"configuring\"\necho \"configured\"');
            done();
        });
    });
    it('should process multiple files', function(done) {
        yphase([__dirname + '/fixtures/test1.yml', __dirname + '/fixtures/test2.yml'], 'configure', function(err, result) {
            assert.ifError(err);
            assert.equal(result, 'echo \"override\"');
            done();
        });
    });
    it('should complain about missing files', function(done) {
        yphase([__dirname + '/fixtures/test1.yml', __dirname + '/fixtures/fake.yml'], 'configure', function(err, result) {
            assert.equal(err.toString(), "Error: ENOENT, no such file or directory '" + __dirname + "/fixtures/fake.yml'");
            done();
        });
    });
    it('should not complain about unknown phases', function(done) {
        yphase(__dirname + '/fixtures/test1.yml', 'fake', function(err, result) {
            assert.ifError(err);
            assert.equal(result, '');
            done();
        });
    });
});
