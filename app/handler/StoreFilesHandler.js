const {ResponseFactory} = require("../factory/ResponseFactory");
const {STATUS, CONTENT_TYPE} = require('../definition/Response.js');
const fs = require("fs");

class StoreFilesHandler {
    /**
     * @method POST
     * @route "/files/{filename}"
     * @param {string} path the path of the request
     * @param {string} requestData should contain all the information from the request
     */
    handleRequest(path, requestData) {
        if (process.argv[2] !== "--directory" || !process.argv[3]) {
            throw new Error("Please, provide a directory when running the server")
        }
        let filename = path.split('/', 3)[2];
        let filePath = process.argv[3] + filename;


        try  {
            let body = requestData.split('\r\n')[7];
            fs.writeFile(filePath, body, 'utf-8', () => {});
        } catch (e) {
            return ResponseFactory.createDefaultErrorResponse().toString();
        }

        return ResponseFactory.createWithStatus(STATUS.CREATED_SUCCESS).toString();
    }
}

module.exports = { StoreFilesHandler }