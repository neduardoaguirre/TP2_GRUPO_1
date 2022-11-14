const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.path = {
      admin: '/api/admin',
      client: '/api/client',
      car: '/api/car',
      advertisement: '/api/advertisement',
      comment: '/api/comment'
    }

    this.connectDB();
    this.middlewares()

    // this.cors();
    this.routes()
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`);
    });
  }

  middlewares() {
    this.app.use(cors())

    this.app.use(express.json({ extended: true }))
  }

  async connectDB() {
    try {
      mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('DB conectada');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  routes() {
    this.app.use(this.path.admin, require('../routes/adminRoutes'));
    this.app.use(this.path.client, require('../routes/clients'));
    this.app.use(this.path.car, require('../routes/cars'));
    this.app.use(this.path.advertisement, require('../routes/advertisements'));
    this.app.use(this.path.comment, require('../routes/comments'));
  }
}

module.exports = Server;
