const net = require("net");

const PORT = 4221;
const HOSTNAME = "localhost";

const HTTP_VERSION = "HTTP/1.1";
const STATUS = {
    "200": "200 OK",
    "404": "404 Not Found"
}

function responseByPath(path) {
    let status = path === "/" ? STATUS["200"] : STATUS["404"];

    return HTTP_VERSION + " " + status + "\r\n\r\n";
}

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        let requestInfo = data.toString();
        let path = requestInfo.split(' ', 2)[1];
        let response = responseByPath(path);

        socket.write(response);
        socket.end();
    });
    socket.on("close", () => {
        socket.end();
        server.close();
        console.log("Connection ended");
    });
});

server.listen(PORT, HOSTNAME);