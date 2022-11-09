const Advertisement = require('../models/mongo/Advertisement');
const Car = require('../models/mongo/Car');
const Comment = require('../models/mongo/Comment');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

exports.newAdvertisement = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { car } = req.body;

  try {
    let carExist = await Car.find({ _id: car });
    if (!carExist) {
      return res.status(400).json({ msg: 'The car does not exist' });
    }
    let advertisement = await Advertisement.findOne({ where: car === carExist._id });
    if (advertisement) {
      return res.status(400).json({ msg: 'A advertisement already exist with this car' });
    }
    advertisement = new Advertisement(req.body);
    await advertisement.save();
    res.json({ msg: 'Advertisement created successfuly', advertisement: advertisement });
  } catch (error) {
    console.log(error);
    res.status(400).send('Sorry, something went wrong');
  }
};

exports.addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { id } = req.params;

  try {
    let advertisement = await Advertisement.find({ _id: id });
    if (!advertisement) {
      return res.status(400).json({ msg: 'The advertisement does not exist' });
    }

    const comment = new Comment(req.body);

    advertisement = await Advertisement.findByIdAndUpdate(
      { _id: id },
      {
        $push: { comments: comment }
      }
    );
    res.json({ msg: 'Comment created', comment: comment });
  } catch (error) {
    console.log(error);
    res.status(400).send('Sorry, something went wrong');
  }
};
