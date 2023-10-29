const net = require("net");
const router = require("./router.js");

const PORT = 4221;
const HOSTNAME = "localhost";

/**
 *
 * @param {string} requestInfo request information as a string
 * @returns {string} path of the request
 */
function getRequestPath(requestInfo) {
    return requestInfo.split(' ', 2)[1];
}

const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        const requestInfo = data.toString();
        const path = getRequestPath(requestInfo);
        const response = router.route(path, requestInfo);

        socket.write(response);
        socket.end();
    });
    socket.on("close", () => {
        socket.end();
        server.close();
    });
});

server.listen(PORT, HOSTNAME);