var assert = require('assert');
var yphase = require('../index');

describe('yphase', function() {
    it('should process a single file', function(done) {
        yphase(__dirname + '/fixtures/test1.yml', 'configure', function(err, result) {
            assert.ifError(err);
            assert.equal(result, 'echo \"configuring\"\necho \"configured\"\n');
            done();
        });
    });
    it('should process multiple files', function(done) {
        yphase([__dirname + '/fixtures/test1.yml', __dirname + '/fixtures/test2.yml'], 'configure', function(err, result) {
            assert.ifError(err);
            assert.equal(result, 'echo \"override\"\n');
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
    it('should support single string values', function(done) {
        yphase(__dirname + '/fixtures/test1.yml', 'one_liner', function(err, result) {
            assert.ifError(err);
            assert.equal(result, 'some_command\n');
            done();
        });
    });
});
