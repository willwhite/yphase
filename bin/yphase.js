var yphase = require('../index');

var argv = require('optimist').argv;

yphase(argv._.slice(0, argv._.length - 1), argv._[argv._.length - 1], function(err, stdout, stderr) {
    if (err) throw err;
    if (stderr) console.error(stderr);
    if (stdout) console.log(stdout);
});
