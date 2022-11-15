const Advertisement = require("../models/Advertisement");
const Car = require("../models/Car");
// const Comment = require("../models/Comment");
const { validationResult } = require("express-validator");

exports.newAdvertisement = async (req, res) => {
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