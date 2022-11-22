
const Admin = require('../models/Admin');
const Client = require('../models/Client');

class AuthRepository {
  async loginAdmin(adminBody) {
    try {
      const admin = await Admin.findOne({ email: adminBody.email })
      if (admin) {
        if (admin.password === adminBody.password) {
          console.log('entra')
          return {
            status: 200,
            token: "123fcnak123",
            msg: "Login successfuly"
          }
        }
      }
      return {
        status: 403,
        msg: "Incorrect user and/or password"
      }

    } catch (err) {
      return {
        msg: 'Incorrect user and/or password',
        status: 403
      }
    }
  }

  async loginClient(clientBody) {
    try {
      const client = await Client.findOne({ email: clientBody.email })
      if (client) {
        if (client.password === clientBody.password) {
          return {
            token: 'ahsdjhasd',
            status: 200
          }
        }
      }
      return {
        status: 403,
        msg: 'Incorrect user and/or password'
      }

    } catch (error) {
      return {
        msg: 'Incorrect user and/or password',
        status: 403
      }
    }
  }
}


module.exports = new AuthRepository(); 