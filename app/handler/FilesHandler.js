const {ResponseFactory} = require("../factory/ResponseFactory");
const {STATUS, CONTENT_TYPE} = require('../definition/Response.js');
const fs = require("fs");

class FilesHandler {
    /**
     * @method GET
     * @route "/files/{filename}"
     * @param {string} path the path of the request
     * @param {string} requestData should contain all the information from the request
     */
    handleRequest(path, requestData) {
        if (process.argv[2] !== "--directory" || !process.argv[3]) {
            throw new Error("Please, provide a directory using \"--directory\" when running the server")
        }
        let filename = path.split('/', 3)[2];
        let filePath = process.argv[3] + filename;

        let file = null;
        try  {
            file = fs.readFileSync(filePath);
        } catch (e) {
            return ResponseFactory.createDefaultNotFoundResponse().toString();
        }

        return ResponseFactory.createWithBodyAndContentType(STATUS.OK, CONTENT_TYPE.APPLICATION_OCTET_STREAM, file.toString()).toString();
    }
}

module.exports = { FilesHandler }