
const Admin = require('../models/Admin');

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
}


module.exports = new AuthRepository(); 