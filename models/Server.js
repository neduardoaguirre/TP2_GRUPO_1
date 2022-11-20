require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.path = {
      swagger: "/api-docs",
      admin: "/api/admin",
      client: "/api/client",
      car: "/api/car",
      advertisement: "/api/advertisement",
      comment: "/api/comment",
      adminLogin: "/api/admin_login",
      clientLogin: "/api/client_login",
    };

    this.connectDB();
    this.middlewares();

    this.routes();
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`);
    });
  }

  middlewares() {
    const specs = swaggerJsdoc(swaggerDocument);

    this.app.use(
      this.path.swagger,
      swaggerUi.serve,
      swaggerUi.setup(specs, { explorer: true })
    );

    this.app.use(cors());

    this.app.use(express.json({ extended: true }));
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

  routes() {
    this.app.use(this.path.admin, require("../routes/adminRoutes"));
    this.app.use(
      this.path.advertisement,
      require("../routes/advertisementRoutes")
    );
    this.app.use(this.path.adminLogin, require("../routes/authAdminRoutes"));
    this.app.use(this.path.clientLogin, require("../routes/authClientRoutes"));
    this.app.use(this.path.car, require("../routes/car.route"));
    this.app.use(this.path.client, require("../routes/clientRoutes"));
    this.app.use(this.path.comment, require("../routes/commentRoutes"));
  }
}

module.exports = Server;
