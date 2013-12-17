var yaml = require('js-yaml');
var fs = require('fs');
var exec = require('child_process').exec;

module.exports = function(files, phase, callback) {
    if (!phase) return callback(new Error('Phase not specified'));

    if (typeof files !== 'object') files = [files];

    var code = files.reverse().reduce(function(memo, file) {
        if (memo) return memo;
        try {
            var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
        } catch (e) { return callback(e); }
        if (phase in doc) memo = doc[phase];
        return memo;
    }, null);

    if (!code) return callback(new Error('Phase not found'));

    exec(code.join('\n'), callback);
};
