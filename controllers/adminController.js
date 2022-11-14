const Admin = require('../models/mongo/Admin');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');

const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(400).json({ msg: `A admin already exist with this email:${email}` });
    }

    admin = new Admin(req.body);
    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password, salt);
    await admin.save();

    const payload = {
      admin: {
        id: admin.id
      }
    };

    // CONTROLLER DE CREATE ADMIN SHOULD NOT HAVE TOKEN
    const token = await generateJWT(payload)
    res.status(200).json({
      admin,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Sorry, something went wrong' });
  }
};

const deleteAdmin = async (req, res) => {
  await Admin.findOneAndRemove({ _id: req.params.id });
  res.status(200).json({ msg: `Admin deleted ${req.params.id}` });
};

const getAllAdmin = async (req, res) => {
  const { limit = 5, from = 0 } = req.query
  const [ admins, total ] = await Promise.all([
    Admin.find()
      .skip(Number(from))
      .limit(Number(limit)),
    Admin.countDocuments()
  ])

  res.status(200).json({
    requestedElements: limit,
    total,
    admins
  })
}

const getAdminById = async (req, res) => {
  const admin = await Admin.findById(req.params.id);
  res.status(200).json({ admin });
}

const updateAdmin = async (req, res) => {
  try {
    let saltedAdmin = new Admin(req.body);
    const salt = bcryptjs.genSaltSync();
    saltedAdmin.password = bcryptjs.hashSync(req.body.password, salt);

    const newAdmin = await Admin.findByIdAndUpdate(req.params.id, saltedAdmin, { new: true });
    res.status(200).json({ newAdmin });
  } catch (err) {
    console.log('error', err)
  }
}

module.exports = {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmin,
  updateAdmin
}
