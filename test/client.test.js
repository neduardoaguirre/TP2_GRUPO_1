require("dotenv").config({ path: ".env" });
const { expect } = require("chai");
const DB = require("../helpers/db.helper");
const { clientMock } = require("../mocks/client.mock");
const ClientMongoose = require("../models/Client");
const clientRepository = require("../repositories/client.repository");

describe("Test's Client", () => {
  let clientId = null;

  before((done) => {
    DB.connect().then(() => done());
  });

  after((done) => {
    ClientMongoose.deleteOne({ dni: clientMock.dni }).then(() => {
      DB.disconnect().then(() => done());
    });
  });

  describe("Guardar cliente", () => {
    it("saves a client", async () => {
      const response = await clientRepository.save(clientMock);
      const status = response.status;
      const data = response.data;

      clientId = data.id;

      expect(data).to.be.an("Object");
      expect(data.dni).equal(clientMock.dni);
      expect(status).equal(200);
    });

    it("does not save the client", async () => {
      const response = await clientRepository.save(clientMock);
      const status = response.status;
      const data = response.data;

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Obtener clientes", () => {
    it("gets clients", async () => {
      const response = await clientRepository.getAll();
      const status = response.status;
      const data = response.data;

      expect(data.length).to.be.greaterThan(0);
      expect(status).equal(200);
    });

    it("gets a client by id", async () => {
      const response = await clientRepository.get(clientId);
      const status = response.status;
      const data = response.data;

      expect(data).to.be.an("Object");
      expect(data.id).equal(clientId);
      expect(data.dni).equal(clientMock.dni);
      expect(status).equal(200);
    });

    it("does not found the client", async () => {
      const response = await clientRepository.get("123");
      const status = response.status;
      const data = response.data;

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Editar cliente", () => {
    it("updates a client", async () => {
      const clientUpdate = {
        email: "newEmail@test.com",
        name: "newNameTest",
      };
      const response = await clientRepository.edit(clientId, clientUpdate);
      const status = response.status;
      const data = response.data;

      expect(data).to.be.an("Object");
      expect(data.email).equal(clientUpdate.email);
      expect(data.name).equal(clientUpdate.name);
      expect(status).equal(200);
    });

    it("does not update the client", async () => {
      const clientUpdate = {
        dni: 33666333,
      };
      const response = await clientRepository.edit(clientId, clientUpdate);
      const status = response.status;
      const data = response.data;

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Borrar auto", () => {
    it("deletes a client", async () => {
      const response = await clientRepository.delete(clientId);
      const status = response.status;

      expect(status).equal(200);
    });

    it("does not delete the client", async () => {
      const response = await clientRepository.delete(clientId);
      const status = response.status;

      expect(status).equal(400);
    });
  });
});
