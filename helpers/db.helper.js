require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

class DB {
  connect = () => {
    return new Promise((resolve) => {
      mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const db = mongoose.connection;

      db.on("error", () => {
        console.error("Error al conectar la BD");
        resolve(db);
        process.exit(1);
      });

      db.once("open", function () {
        console.log("BD conectada");
        resolve(db);
      });
    });
  };

  async disconnect() {
    await mongoose.disconnect();
    console.log("BD desconectada");
  }
}

module.exports = new DB();
