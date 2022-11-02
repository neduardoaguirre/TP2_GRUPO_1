const express = require('express');
// const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`);
    });
  }
  json() {
    this.app.use(express.json({ extended: true }));
  }
  cors() {
    this.app.use(cors());
  }
}

module.exports = Server;
