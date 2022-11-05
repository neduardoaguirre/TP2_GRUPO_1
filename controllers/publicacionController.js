const Publicacion = require('../models/mongo/Publicacion');
const Auto = require('../models/mongo/Auto');
const { validationResult } = require('express-validator');

exports.newPublicacion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { car } = req.body;

  try {
    let auto = await Auto.find({ _id: car });
    if (!auto) {
      return res.status(400).json({ msg: 'The car does not exist' });
    }
    let publicacion = await Publicacion.findOne({ where: car === auto._id });
    if (publicacion) {
      return res.status(400).json({ msg: 'A advertisement already exist with this car' });
    }
    publicacion = new Publicacion(req.body);
    await publicacion.save();
    res.json({ msg: 'Advertisement created successfuly', advertisement: publicacion });
  } catch (error) {
    console.log(error);
    res.status(400).send('Sorry, something went wrong');
  }
};
