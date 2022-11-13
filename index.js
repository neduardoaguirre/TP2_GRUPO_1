const Server = require("./models/server");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const server = new Server();

server.connectDB();
server.cors();
server.json();

const specs = swaggerJsdoc(swaggerDocument);

server.app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

server.app.use("/api/admins", require("./routes/admins"));
server.app.use("/api/clients", require("./routes/clients"));
server.app.use("/api/cars", require("./routes/cars"));
server.app.use("/api/advertisements", require("./routes/advertisements"));
server.app.use("/api/comments", require("./routes/comments"));

server.listen();
