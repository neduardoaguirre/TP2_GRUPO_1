const Advertisement = require('../models/Advertisement');
const Car = require('../models/Car');

/**
 * Add new advertisement
 */
const newAdvertisement = async (req, res) => {
  const { car: carId } = req.body;
  try {
    let carExist = await Car.findOne({ _id: carId });
    if (!carExist) {
      return res.status(404).json({ msg: 'The car does not exist' });
    }
    let exists = await Advertisement.findOne({ car: carId });
    if (exists) {
      return res.status(409).json({ msg: 'A advertisement already exist with this car' });
    }
    let advertisement = new Advertisement(req.body);
    await advertisement.save();
    res.status(201).json({
      msg: 'Advertisement created successfuly',
      advertisement
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({ msg: 'Sorry, something went wrong' });
  }
};

/**
 * Get advertisement by id
 */
const getAdvertisementById = async (req, res) => {
  const { id } = req.params;
  const adv = await Advertisement.findById(id).populate('comments').populate('car');

  try {
    if (!adv) {
      return res.status(404).json({ msg: `Advertisement with id (${id}) does not exist` });
    }
    return res.status(200).json(adv);
  } catch (error) {
    res.status(422).json({ msg: 'Sorry, something went wrong' });
  }
};

/**
 * Get all advertisements
 */
const getAllAdvertisements = async (req, res) => {
  try {
    const advs = await Advertisement.find();
    res.status(200).json(advs);
  } catch (error) {
    res.status(422).json({ msg: 'Sorry, something went wrong' });
  }
};

/**
 * Update advertisement by id
 */
const updateAdvertisementById = async (req, res) => {
  try {
    await Advertisement.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    res.status(200).json({ msg: `Advertisement id: ${req.params.id} has been updated` });
  } catch (error) {
    res.status(404).json(error).send('There is no advertisement with this id');
  }
};

/**
 * Delete advertisement by id
 */
const deleteAdvertisementById = async (req, res) => {
  try {
    await Advertisement.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: `Advertisement id: ${req.params.id} has been deleted` });
  } catch (error) {
    res.status(404).json(error).send('There is no advertisement with this id');
  }
};

module.exports = {
  newAdvertisement,
  getAdvertisementById,
  deleteAdvertisementById,
  updateAdvertisementById,
  getAllAdvertisements
};
