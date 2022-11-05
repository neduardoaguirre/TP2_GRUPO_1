const Server = require('./models/server');

const server = new Server();

server.connectDB();
server.cors();
server.json();

server.app.use('/api/new_admin', require('./routes/admins'));
server.app.use('/api/new_client', require('./routes/clientes'));
server.app.use('/api/new_car', require('./routes/autos'));
server.app.use('/api/new_advertisement', require('./routes/publicaciones'));

server.listen();
