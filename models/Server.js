require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

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
  connectDB() {
    try {
      mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DB conectada");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
}

module.exports = Server;
