const Advertisement = require("../models/Advertisement");
const Car = require("../models/Car");
// const Comment = require("../models/Comment");
const { validationResult } = require("express-validator");

const newAdvertisement = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { car } = req.body;

  try {
    let carExist = await Car.find({ _id: car });
    if (!carExist) {
      return res.status(400).json({ msg: "The car does not exist" });
    }
    let advertisement = await Advertisement.findOne({
      where: car === carExist._id,
    });
    if (advertisement) {
      return res
        .status(400)
        .json({ msg: "A advertisement already exist with this car" });
    }
    advertisement = new Advertisement(req.body);
    await advertisement.save();
    res.json({
      msg: "Advertisement created successfuly",
      advertisement: advertisement,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Sorry, something went wrong");
  }
};

/**
 * Get advertisement by id
 */

const getAdvertisementById = async (req, res) => {
  const { id } = req.params
  const adv = await Advertisement.findById(id)

  try {
    if (!adv) {
      return res.status(400).json({ msg: `Advertisement with id (${id}) does not exist` })
    }
    return res.status(200).json(adv)

  } catch (error) {
    res.status(400).json(error).send("Sorry, something went wrong");
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
    res.status(400).json(error).send("Sorry, something went wrong");
  }
};

/**
 * Update advertisement by id
 */
const updateAdvertisementById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  try {
    await Advertisement.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    res.status(200).json("Advertisement has been updated");
  } catch (error) {
    res.status(404).json(error).send("There is no advertisement with this id");
  }
};

/**
 * Delete advertisement by id
 */
const deleteAdvertisementById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  try {
    await Advertisement.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json("Advertisement has been deleted");
  } catch (error) {
    res.status(404).json(error).send("There is no advertisement with this id");
  }
};

module.exports = {
  newAdvertisement,
  getAdvertisementById,
  deleteAdvertisementById,
  updateAdvertisementById,
  getAllAdvertisements
}
