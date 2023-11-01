const {ResponseFactory} = require("../factory/ResponseFactory");
const {STATUS} = require('../definition/Response.js');

class EchoHandler {
    /**
     * @method GET
     * @route "/echo/{string}"
     * @param {string} path the path of the request
     * @param {string} requestData should contain all the information from the request
     */
    handleRequest(path, requestData) {
        const body = path.replace('/echo/','');
        return ResponseFactory.createWithBody(STATUS.OK, body).toString();
    }
}

module.exports = { EchoHandler }