const Advertisement = require("../models/Advertisement");
const { validationResult } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const AdvertisementRepository = require("../repositories/advertisement.repository");
const advertisementRepository = require("../repositories/advertisement.repository");


const newAdvertisement = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  try {
    const advertisementBody = req.body
    const response = await AdvertisementRepository.save(advertisementBody);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("AdvertisementController - newAdvertisement - ERROR: ", error);
    res.status(500).json({ msg: "Sorry, something went wrong", status: 500 });
  }
};

/**
 * Get advertisement by id
 */

const getAdvertisementById = async (req, res) => {
  try {
    const { id } = req.params
    const advertisement = await AdvertisementRepository.get(id)
    res.status(response.status).json(response);
  } catch (error) {
    console.error("AdvertisementController - getAdvertisement - ERROR: ", error);
    res.status(500).json({ msg: "Sorry, something went wrong", status: 500 });
  }
};

/**
 * Get all advertisements
 */

const getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await AdvertisementRepository.getAll();
    res.status(advertisements.status).json(advertisements);
  } catch (error) {
    console.error("AdvertisementController - getAdvertisements - ERROR: ", error);
    res.status(500).json({ msg: "Sorry, something went wrong", status: 500 });  }
};

/**
 * Update advertisement by id
 */
const updateAdvertisementById = async (req, res) => {
  try {
    const { id } = req.params;
    const advertisementBody = req.body;
    const advertisement = await AdvertisementRepository.edit(id, advertisementBody);
    res.status(advertisement.status).json(advertisement);
  } catch (error) {
    console.error("AdvertisementController - updateAdvertisement - ERROR: ", error);
    res.status(500).json({ msg: "Sorry, something went wrong", status: 500 });
  }
};

/**
 * Delete advertisement by id
 */
const deleteAdvertisementById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await AdvertisementRepository.delete(id);
    res.status(response.status).json(response);
  } catch (error) {
    console.error("AdvertisementController - deleteAdvertisement - ERROR: ", error);
    res.status(500).json({ msg: "Sorry, something went wrong", status: 500 });
  }
};

module.exports = {
  newAdvertisement,
  getAdvertisementById,
  deleteAdvertisementById,
  updateAdvertisementById,
  getAllAdvertisements
}
