const {ResponseFactory} = require("../factory/ResponseFactory");
const {STATUS} = require('../definition/Response.js');

class EchoHandler {
    /**
     * @route "/"
     * @param {string} path the path of the request
     * @param {string} requestData should contain all the information from the request
     */
    handleRequest(path, requestData) {
        const body = path.split('/')[1];
        return ResponseFactory.createWithBody(STATUS.OK, body).toString();
    }
}

module.exports = { EchoHandler }