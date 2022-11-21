const Client = require("../models/Client");

const clientMock = new Client({
    email: 'testEmail@test.com',
    password: 'test1234',
    name: 'TestName',
    surname: 'TestSurname',
    dni: 11222333,
    historyOfSearch: [],
    favorites: [],
    downPaymentCars: []
});

module.exports = {
    clientMock,
};