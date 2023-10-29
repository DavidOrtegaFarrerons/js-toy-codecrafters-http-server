const {ResponseFactory} = require("../factory/ResponseFactory");

class RootHandler {
    /**
     * @route "/"
     * @param {string} path the path of the request
     * @param {string} requestData contains all the information from the request
     */
    handleRequest(path, requestData) {
        return ResponseFactory.createDefaultOkResponse().toString();
    }
}

module.exports = { RootHandler }