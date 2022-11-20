require("dotenv").config({ path: ".env" });
const { expect } = require("chai");
const DB = require("../helpers/db.helper");
const { carMock } = require("../mocks/car.mock");
const CarMongoose = require("../models/Car");
const carRepository = require("../repositories/car.repository");

describe("Test's Auto", () => {
  let carId = null;

  before((done) => {
    DB.connect().then(() => done());
  });

  after((done) => {
    CarMongoose.deleteOne({ licensePlate: carMock.licensePlate }).then(() => {
      DB.disconnect().then(() => done());
    });
  });

  describe("Guardar auto", () => {
    it("Auto guardado", async () => {
      const response = await carRepository.save(carMock);
      const status = response.status;
      const data = response.data;

      carId = data.id;

      expect(data).to.be.an("Object");
      expect(data.licensePlate).equal(carMock.licensePlate);
      expect(status).equal(200);
    });

    it("Auto no guardado", async () => {
      const response = await carRepository.save(carMock);
      const status = response.status;
      const data = response.data;

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Editar auto", () => {
    it("Auto editado", async () => {
      const carUpdate = {
        description: "Estado exelente",
        price: 10000,
      };
      const response = await carRepository.edit(carId, carUpdate);
      const status = response.status;
      const data = response.data;

      expect(data).to.be.an("Object");
      expect(data.description).equal(carUpdate.description);
      expect(data.price).equal(carUpdate.price);
      expect(status).equal(200);
    });

    it("Auto no editado", async () => {
      const carUpdate = {
        color: "Blanco",
        price: 10000,
      };
      const response = await carRepository.edit(carId, carUpdate);
      const status = response.status;
      const data = response.data;

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Borrar auto", () => {
    it("Auto borrado", async () => {
      const response = await carRepository.delete(carId);
      const status = response.status;

      expect(status).equal(200);
    });

    it("Auto no borrado", async () => {
      const response = await carRepository.delete(carId);
      const status = response.status;

      expect(status).equal(400);
    });
  });
});
