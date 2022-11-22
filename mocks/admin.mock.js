const Admin = require('../models/Admin')

const adminMock = new Admin({
  email: 'adminTest@test.com',
  password: 'TestAdmin1234',
  role: 'admin'
})

module.exports = {
  adminMock
}