const { adminMock } = require('../mocks/admin.mock');
const { expect } = require("chai");
const MongoAdmin = require('../models/Admin');
const adminRepository = require('../repositories/admin.repository');
const DB = require("../helpers/db.helper");

describe("Admin", () => {
  let adminId = null

  before((done) => {
    DB.connect().then(() => done());
  });

  after((done) => {
    MongoAdmin.deleteOne({ mail: adminMock.email }).then(() => {
      DB.disconnect().then(() => done());
    });
  });

  describe("Crear admin", () => {
    it("Admin guardado", async () => {
      const { status, data } = await adminRepository.save(adminMock);
      adminId = data.id

      expect(data).to.be.an("Object");
      expect(data.email).equal(adminMock.email);
      expect(status).equal(200);
    });

    it("Error al guardar admin", async () => {
      const { status, data } = await adminRepository.save(adminMock);

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Buscar admin ", () => {
    it("Buscar admin por ID", async () => {

      const { status, data } = await adminRepository.get(adminId)

      expect(data).to.be.an("Object")
      expect(data.id).equal(adminId)
      expect(data.email).equal(adminMock.email)
      expect(status).equal(200)
    });


    it("Error admin por ID ", async () => {
      const { status, data } = await adminRepository.get('1112')

      expect(data).equal(undefined)
      expect(status).equal(400)
    });

    it("Buscar admins", async () => {
      const { status, data } = await adminRepository.getAll()

      expect(data.length).to.be.greaterThan(0)
      expect(status).equal(200)
    });
  });

  describe("Editar admin", () => {
    it("Admin editado", async () => {
      const adminUpdate = {
        email: 'emailUpdate@test.com'
      }

      const { status, data } = await adminRepository.edit(adminId, adminUpdate)

      expect(data).to.be.an("Object")
      expect(data.email).equal(adminUpdate.email)
      expect(status).equal(200)
    });

    it("Admin no editado", async () => {
      const adminUpdate = {
        failError: 'emailUpdate@test.com'
      }

      const { status, data } = await adminRepository.edit(adminId, adminUpdate)

      expect(data).equal(undefined)
      expect(status).equal(400)
    });
  });

  describe("Borrar admin", () => {
    it("Admin borrado", async () => {
      const response = await adminRepository.delete(adminId);
      const status = response.status;

      expect(status).equal(200);
    });

    it("Admin no borrado", async () => {
      const response = await adminRepository.delete(adminId);
      const status = response.status;

      expect(status).equal(400);
    });
  });
})
