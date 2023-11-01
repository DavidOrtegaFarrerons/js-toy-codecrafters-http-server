const net = require("net");
const router = require("./router.js");

const PORT = 4221;
const HOSTNAME = "localhost";

/**
 *
 * @param {string} requestInfo request information as a string
 * @returns {string[]} path of the request
 */
function getRequestData(requestInfo) {
    return requestInfo.split(' ', 2);
}



const server = net.createServer((socket) => {
    socket.on("data", (data) => {
        const requestInfo = data.toString();
        const [method, path] = getRequestData(requestInfo);
        const response = router.route(method, path, requestInfo);

        socket.write(response);
        socket.end();
    });
    socket.on("close", () => {
        socket.end();
    });
});

server.listen(PORT, HOSTNAME);