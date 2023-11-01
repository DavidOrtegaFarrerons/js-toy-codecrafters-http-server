const {ResponseFactory} = require("./factory/ResponseFactory.js");
const METHODS = {
    GET: 'GET',
    POST: 'POST'
}
const getRoutes = {
    '/': new (require('./handler/RootHandler.js').RootHandler),
    '/echo': new (require('./handler/EchoHandler.js').EchoHandler),
    '/user-agent': new (require('./handler/UserAgentHandler.js').UserAgentHandler),
    '/files': new (require('./handler/FilesHandler.js').FilesHandler),
}

const postRoutes = {
    '/files': new (require('./handler/StoreFilesHandler.js').StoreFilesHandler),
}

function route(method, path, requestData) {

    let routeType = method === METHODS.GET ? getRoutes : postRoutes;

    let handler = routeType[path];

    if (!handler && path.includes('/echo')) {
        handler = routeType['/echo'];
    }

    if (!handler && path.includes('/files')) {
        handler = routeType['/files'];
    }
    if (handler) {
        return handler.handleRequest(path, requestData);
    } else {
        return ResponseFactory.createDefaultNotFoundResponse().toString();
    }
}

module.exports = { route };