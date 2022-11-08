const Server = require('./models/server');

const server = new Server();

server.connectDB();
server.cors();
server.json();

server.app.use('/api/admin', require('./routes/admins'));
server.app.use('/api/client', require('./routes/clientes'));
server.app.use('/api/car', require('./routes/autos'));
server.app.use('/api/advertisement', require('./routes/publicaciones'));

server.listen();
