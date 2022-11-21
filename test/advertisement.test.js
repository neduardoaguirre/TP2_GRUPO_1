require("dotenv").config({ path: ".env" });
const { expect } = require("chai");
const DB = require("../helpers/db.helper");
const { advertisementMock } = require("../mocks/advertisement.mock");
const AdvertisementMongoose = require("../models/Advertisement");
const AdvertisementRepository = require("../repositories/advertisement.repository");


describe('Advertisemet tests', () => {

  let advertisementId = null;

  before((done) => {
    DB.connect().then(() => done());
  });

  after((done) => {
    AdvertisementMongoose.deleteOne({ id: advertisementMock.id }).then(() => {
      DB.disconnect().then(() => done());
    });
  });

  describe("Save advertisement", () => {
    it("Advertisement saved", async () => {
      const response = await AdvertisementRepository.save(advertisementMock);
      const status = response.status;
      const data = response.data;

      advertisementId = data.id;

      expect(data).to.be.an("Object");
      expect(data.id).equal(advertisementMock.id);
      expect(status).equal(200);
    });

    it("Advertisement not saved", async () => {
      const response = await AdvertisementRepository.save(advertisementMock);
      const status = response.status;
      const data = response.data;

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Get advertisements", () => {
    it("Advertisements not found", async () => {
      const response = await AdvertisementRepository.getAll();
      const status = response.status;
      const data = response.data;

      expect(data.length).to.be.greaterThan(0);
      expect(status).equal(200);
    });

    it("Advertisement found", async () => {
      const response = await AdvertisementRepository.get(advertisementId);
      const status = response.status;
      const data = response.data;

      expect(data).to.be.an("Object");
      expect(data.id).equal(advertisementId);
      expect(data.id).equal(advertisementMock.id);
      expect(status).equal(200);
    });

    it("Advertisement not found", async () => {
      const response = await AdvertisementRepository.get("12328349");
      const status = response.status;
      const data = response.data;

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Edit advertisement", () => {
    it("Advertisement edited", async () => {
      const advertisementUpdate = {
        title: "Great opportunity Toyota Yaris!",
        paid: false,
      };
      const response = await AdvertisementRepository.edit(advertisementId, advertisementUpdate);
      const status = response.status;
      const data = response.data;

      expect(data).to.be.an("Object");
      expect(data.title).equal(advertisementUpdate.title);
      expect(data.paid).equal(advertisementUpdate.paid);
      expect(status).equal(200);
    });

    it("Advertisement not edited", async () => {
      const advertisementUpdate = {
        location: "Belgrano, CABA",
        description: "Great opportunity, Toyota Yaris 2022",
      };
      const response = await AdvertisementRepository.edit(advertisementId, advertisementUpdate);
      const status = response.status;
      const data = response.data;

      expect(data).equal(undefined);
      expect(status).equal(400);
    });
  });

  describe("Delete advertisement", () => {
    it("Advertisement deleted", async () => {
      const response = await AdvertisementRepository.delete(advertisementId);
      const status = response.status;

      expect(status).equal(200);
    });

    it("Advertisement not deleted", async () => {
      const response = await AdvertisementRepository.delete(advertisementId);
      const status = response.status;

      expect(status).equal(400);
    });
  });
});