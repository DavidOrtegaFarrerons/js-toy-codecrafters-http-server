const {ResponseFactory} = require("../factory/ResponseFactory");
const {STATUS, CONTENT_TYPE} = require('../definition/Response.js');
const fs = require("fs");
const pathLib = require("path");

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
        let filename = path.substring("/files/".length);
        let filePath = process.argv[3] + filename;
        let body = requestData.split('\r\n')[7];

        try  {
            if(!fs.existsSync(filePath)) {
                const folder = pathLib.dirname(filePath)
                if(!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                }
            }

            fs.writeFileSync(filePath, body);
        } catch (e) {
            console.log(e);
            return ResponseFactory.createDefaultErrorResponse().toString();
        }

        return ResponseFactory.createWithStatus(STATUS.CREATED_SUCCESS).toString();
    }
}

module.exports = { StoreFilesHandler }