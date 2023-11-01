const {ResponseFactory} = require("../factory/ResponseFactory");
const {STATUS} = require('../definition/Response.js');
const fs = require("fs");

class FilesHandler {
    /**
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
        console.log("FILENAME: " + filename);
        console.log("FILEPATH: " + filePath);

        try  {
            let file = fs.readFileSync(filePath);
        } catch (e) {
            return ResponseFactory.createDefaultNotFoundResponse();
        }

        return ResponseFactory.createDefaultOkResponse();
    }
}

module.exports = { FilesHandler }