const Server = require('./models/server');

const server = new Server();

server.connectDB();
server.cors();
server.json();

server.app.use('/api/admins', require('./routes/admins'));
server.app.use('/api/clients', require('./routes/clients'));
server.app.use('/api/cars', require('./routes/cars'));
server.app.use('/api/advertisements', require('./routes/advertisements'));
server.app.use('/api/comments', require('./routes/comments'));

server.listen();
