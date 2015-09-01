function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

define("EXEC_ERR", "execute command failed!");
define("PARSE_ERR", "parse result failed!");
define("EXEC_OPTION", {
    timeout: 500,
    killSignal: 'SIGKILL'
});
