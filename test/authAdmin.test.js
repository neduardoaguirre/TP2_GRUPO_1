const { expect } = require("chai");
const DB = require("../helpers/db.helper");
const { adminMock } = require('../mocks/admin.mock');
const MongoAdmin = require('../models/Admin');
const adminRepository = require("../repositories/admin.repository");
const authRepository = require("../repositories/authRepository");


describe("Auth - Admin", () => {
  before((done) => {
    DB.connect().then(() => done());
  });

  after((done) => {
    MongoAdmin.deleteOne({ mail: adminMock.email }).then(() => {
      DB.disconnect().then(() => done());
    });
  });

  describe("Auth Admin", () => {
    it("Login admin", async () => {
      await adminRepository.save(adminMock);
      const { status, token } = await authRepository.loginAdmin(adminMock);

      expect(token).to.be.an("String");
      expect(status).equal(200);
    });

    it("Error login admin", async () => {
      const { status, data } = await authRepository.loginAdmin({
        email: "",
        password: "",
      });

      expect(data).equal(undefined);
      expect(status).equal(403);
    })

  })

})