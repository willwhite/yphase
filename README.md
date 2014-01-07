yphase
======
Extendible scripting with YAML config files (travis.yml style).

yphase takes three arguments:

- files: A path to a YAML file as a string or multiple paths as an array of
  strings. Path at the end of the array will override those at the begining.
- phase: The phase to search for an execute. yphase will search for the phase
  starting at the end of the `files` array. It will execute the phase as soon
  as it find a match.
- callback: A function that will be called when search and (if applicable)
  execution is complete. It is passed `err`, `stdout`, and `stderr` arguments.

```
var yphase = require('yphase');
yphase(['test1.yml', 'test2.yml'], 'build', function(err, stdout, stderr) {
   // If test2.yml contains a `build` phase it will win over one in test1.yml.
});
```

Binary usage
------------

```
yphase <file 1> [file n] <phase>
```

```
yphase path/to/test1.yml /other/path/to/test2.yml install | bash
```
