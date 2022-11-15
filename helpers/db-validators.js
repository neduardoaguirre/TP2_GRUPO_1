const Admin = require("../models/Admin")

const adminExists = async (id) => {
  const exists = await Admin.findById(id)
  if (!exists) throw new Error(`Admin with id ${id} not found`)
}

const adminExistsByEmail = async (email = '') => {
  const exists = await Admin.findOne({ email })
  if (exists) throw new Error(`Admin with email ${email} already exists`)
}


module.exports = {
  adminExists,
  adminExistsByEmail
}