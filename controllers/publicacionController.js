const Publicacion = require('../models/mongo/Publicacion');
const Auto = require('../models/mongo/Auto');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

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

exports.addComentario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { text } = req.body;
  const { id } = req.params;

  const comentario = { date: Date.now(), text, id: uuidv4() };

  try {
    let publicacion = await Publicacion.find({ _id: id });
    if (!publicacion) {
      return res.status(400).json({ msg: 'The advertisement does not exist' });
    }

    publicacion = await Publicacion.findByIdAndUpdate(
      { _id: id },
      {
        $push: { comments: comentario }
      }
    );
    res.json({ msg: 'Comment created' });
  } catch (error) {
    console.log(error);
    res.status(400).send('Sorry, something went wrong');
  }
};
