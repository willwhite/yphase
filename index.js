var yaml = require('js-yaml');
var fs = require('fs');

module.exports = function(files, phase, callback) {
    if (!phase) return callback(new Error('Phase not specified'));

    if (typeof files !== 'object') files = [files];

    var code = files.reverse().reduce(function(memo, file) {
        if (memo) return memo;
        try {
            var doc = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
        } catch (e) {
            memo = e;
            return memo;
        }
        if (phase in doc) memo = doc[phase];
        return memo;
    }, null) || [];

    if (code instanceof Error) return callback(code);
    if (!(code instanceof Array)) code = [code];
    code = code.join('\n');
    if (code) code += '\n';

    callback(null, code);
};
