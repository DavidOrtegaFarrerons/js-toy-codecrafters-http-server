const {Response, STATUS, CONTENT_TYPE} = require('../definition/Response.js');

class ResponseFactory {

    static createDefaultOkResponse() {
        return new Response(STATUS.OK);
    }

    static createDefaultNotFoundResponse() {
        return new Response(STATUS.NOT_FOUND);
    }

    static createDefaultErrorResponse() {
        return new Response(STATUS.SERVER_ERROR);
    }

    static createWithStatus(status) {
        return new Response(status);
    }

    static createWithBody(responseStatus, body) {
        return new Response(responseStatus, CONTENT_TYPE.TEXT_PLAIN).setBody(body);
    }

    static createWithBodyAndContentType(responseStatus, contentType, body) {
        return new Response(responseStatus, contentType).setBody(body);
    }
}

module.exports = { ResponseFactory };
