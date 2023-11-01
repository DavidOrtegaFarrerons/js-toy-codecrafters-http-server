const EOL = "\r\n";
const HTTP_VERSION = "HTTP/1.1";
const STATUS = {
    OK: "200 OK",
    CREATED_SUCCESS: "201 Created",
    NOT_FOUND: "404 Not Found",
    SERVER_ERROR: "500 Internal Server Error"
}
const CONTENT_TYPE = {
    TEXT_PLAIN: "text/plain",
    APPLICATION_OCTET_STREAM: "application/octet-stream"
}


class Response {

    constructor(status, contentType, body = '') {
        this.httpVersion = HTTP_VERSION;
        this.status = status;
        this.contentType = contentType ?? CONTENT_TYPE.TEXT_PLAIN;
        this.contentLength = 0;
        this.body = body;
    }

    setStatus(status) {
        const newStatus = STATUS[status];
        if (newStatus) {
            throw new Error("Status: " + status + " does not exist");
        }

        this.status = newStatus;
        return this;
    }

    setContentType(contentType) {
        const newContentType = STATUS[contentType];
        if (!newContentType) {
            throw new Error("Status: " + newContentType + " does not exist");
        }

        this.status = newContentType;
        return this;
    }

    setBody(body) {
        this.body = body;
        this.contentLength = Buffer.byteLength(body, 'utf-8');
        return this;
    }

    toString() {
        let response = `${this.httpVersion} ${this.status}${EOL}`;
        response += `Content-Type: ${this.contentType}${EOL}`;
        response += `Content-Length: ${this.contentLength}${EOL}`;
        response += EOL;
        response += this.body;
        response += EOL + EOL; //Define end of response
        return response;
    }
}

module.exports = { Response, STATUS, CONTENT_TYPE };