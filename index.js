const Server = require('./models/server');

const server = new Server();

server.connectDB();
server.cors();
server.json();
server.listen();
