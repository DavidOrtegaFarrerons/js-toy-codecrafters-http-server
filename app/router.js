const {ResponseFactory} = require("./factory/ResponseFactory.js");

const routes = {
    '/': new (require('./handler/RootHandler.js').RootHandler),
    '/echo': new (require('./handler/EchoHandler.js').EchoHandler)

}

function route(path, requestData) {
    let handler = routes[path];

    if (!handler && path.includes('/echo')) {
        handler = routes['/echo'];
    }
    if (handler) {
        return handler.handleRequest(path, requestData);
    } else {
        return ResponseFactory.createDefaultNotFoundResponse().toString();
    }
}

module.exports = { route };