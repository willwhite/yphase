var assert = require('assert');
var yphase = require('../index');

describe('yphase', function() {
    it('should process a single file', function(done) {
        yphase(__dirname + '/fixtures/test1.yml', 'configure', function(err, stdout, stderr) {
            assert.ifError(err);
            assert.equal(stdout, 'configuring\nconfigured\n');
            assert.equal(stderr, '');
            done();
        });
    });
    it('should process multiple files', function(done) {
        yphase([__dirname + '/fixtures/test1.yml', __dirname + '/fixtures/test2.yml'], 'configure', function(err, stdout, stderr) {
            assert.ifError(err);
            assert.equal(stdout, 'override\n');
            assert.equal(stderr, '');
            done();
        });
    });
    it('should complain about missing files', function(done) {
        yphase([__dirname + '/fixtures/test1.yml', __dirname + '/fixtures/fake.yml'], 'configure', function(err, stdout, stderr) {
            assert.equal(err, "Error: ENOENT, no such file or directory '" + __dirname + "/fixtures/fake.yml'");
            done();
        });
    });
    it('should complain unknown phases', function(done) {
        yphase(__dirname + '/fixtures/test1.yml', 'fake', function(err, stdout, stderr) {
            assert.equal(err, 'Error: Phase not found');
            done();
        });
    });
});
