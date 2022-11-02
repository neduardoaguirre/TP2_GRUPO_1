const Server = require('./models/server');

const server = new Server();

server.connectDB();
server.cors();
server.json();

server.app.use('/api/admins', require('./routes/admins'));

server.listen();
