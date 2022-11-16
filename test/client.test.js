const expect = require("chai").expect;
const assert = require('chai').assert;
const Client = require("../models/Client");

describe("CRUD clients in mongoDB", () => {

  let client;
  // this will run before running every test
  beforeEach(() => {
      client = new Client({  
        email: 'testEmail@test.com',
        password: 'test1234',
        name: 'TestName',
        surname: 'TestSurname',
        dni: 11222333,
        historyOfSearch: [],
        favorites: [],
        downPaymentCars: []
      });
  });

  describe('Creating a Client', () => {
    it('Creates a new client', () => {
        const createNewClient = () => {
          client.save()
        }
        assert.doesNotThrow(createNewClient)
    });
  });

  describe('Reading a Client', () => {
    it('Finds client with the ID', () => {
      const readClient = () => {
        Client.findById(client._id)
      }
      assert.doesNotThrow(readClient)
    })
  })

  describe('Updating a Client', () => {
    it('Finds client with the ID and update', () => {
      const updateClient = () => {
        Client.findOneAndUpdate(client._id, {name: 'TestNameUpdated'})
      }
      assert.doesNotThrow(updateClient)
    });
  });

  describe('Deleting a Client', () => {
    it('Finds client with the ID and delete', () => {

      const deleteClient = () => {
        Client.findOneAndDelete(client._id)
      }
      assert.doesNotThrow(deleteClient)
    });
  });
});
