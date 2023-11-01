const {ResponseFactory} = require("./factory/ResponseFactory.js");

const routes = {
    '/': new (require('./handler/RootHandler.js').RootHandler),
    '/echo': new (require('./handler/EchoHandler.js').EchoHandler),
    '/user-agent': new (require('./handler/UserAgentHandler.js').UserAgentHandler),
    '/files': new (require('./handler/FilesHandler.js').FilesHandler),

}

function route(path, requestData) {
    let handler = routes[path];

    if (!handler && path.includes('/echo')) {
        handler = routes['/echo'];
    }

    if (!handler && path.includes('/files')) {
        handler = routes['/files'];
    }
    if (handler) {
        return handler.handleRequest(path, requestData);
    } else {
        return ResponseFactory.createDefaultNotFoundResponse().toString();
    }
}

module.exports = { route };