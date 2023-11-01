const {ResponseFactory} = require("../factory/ResponseFactory");
const {STATUS} = require('../definition/Response.js');

class UserAgentHandler {
    /**
     * @route "/user-agent"
     * @param {string} path the path of the request
     * @param {string} requestData should contain all the information from the request
     */
    handleRequest(path, requestData) {
        const body = this.getUserAgent(requestData);
        return ResponseFactory.createWithBody(STATUS.OK, body).toString();
    }

    getUserAgent(requestInfo) {
        return requestInfo.split('\n')[2].split(' ')[1].trim();
    }
}

module.exports = { UserAgentHandler }