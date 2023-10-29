const net = require("net");

const PORT = 4221;
const HOSTNAME = "localhost";
const server = net.createServer((socket) => {
    console.log("New connection");

    socket.on("data", (data) => {
        socket.write("HTTP/1.1 200 OK\r\n\r\n");
        socket.end();
    });
    socket.on("close", () => {
        socket.end();
        server.close();
        console.log("Connection ended");
    });
});



server.listen(PORT, HOSTNAME);