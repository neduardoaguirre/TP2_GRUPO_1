const { expect } = require("chai");
const DB = require("../helpers/db.helper");
const { clientMock } = require('../mocks/client.mock')
const Client = require('../models/Client');
const authRepository = require("../repositories/authRepository");
const clientRepository = require('../repositories/client.repository')


describe("Auth Client", () => {
  before((done) => {
    DB.connect().then(() => done());
  });

  after((done) => {
    Client.deleteOne({ mail: clientMock.email }).then(() => {
      DB.disconnect().then(() => done());
    });
  });

  describe("Auth Admin", () => {
    it("Login client", async () => {
      await clientRepository.save(clientMock);
      const { status, token } = await authRepository.loginClient(clientMock);

      expect(token).to.be.an("String");
      expect(status).equal(200);
    });

    it("Error login client", async () => {
      const { status, data } = await authRepository.loginClient({
        email: "",
        password: "",
      });

      expect(data).equal(undefined);
      expect(status).equal(403);
    })

  })

})