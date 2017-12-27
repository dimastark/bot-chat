const debug = require('debug');

module.exports = namespace => {
    let log = debug(`bots-chat:${namespace}:log`);
    let error = debug(`bots-chat:${namespace}:error`);

    log.log = console.log.bind(console);

    return {error, log};
};
