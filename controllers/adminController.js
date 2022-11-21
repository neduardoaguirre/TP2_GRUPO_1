const Admin = require('../models/Admin');
const bcryptjs = require('bcryptjs');

/**
 * Create new admin
 */
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

    res.status(200).json({
      msg: `Admin created`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Sorry, something went wrong' });
  }
};

/**
 * Delete admin by id
 */
const deleteAdmin = async (req, res) => {
  await Admin.findOneAndRemove({ _id: req.params.id });
  res.status(200).json({ msg: `Admin deleted ${req.params.id}` });
};

const getAllAdmin = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const [admins, total] = await Promise.all([
    Admin.find().select('-password').skip(Number(from)).limit(Number(limit)),
    Admin.countDocuments()
  ]);

  res.status(200).json({
    requestedElements: limit,
    total,
    admins
  });
};

/**
 * Get admin by id
 */
const getAdminById = async (req, res) => {
  const admin = await Admin.findById(req.params.id).select('-password');
  res.status(200).json(admin);
};

/**
 * Update admin by id
 */
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    let { email, ...rest } = req.body;
    const adminUpdated = await Admin.findByIdAndUpdate({ _id: id }, { email }, { new: true }).select('-password');
    res.status(200).json({ adminUpdated: adminUpdated });
  } catch (err) {
    console.log('error', err);
  }
};

module.exports = {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAllAdmin,
  updateAdmin
};
