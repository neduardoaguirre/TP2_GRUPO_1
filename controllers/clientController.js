const Client = require("../models/mongo/Client");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

/**
 * Get client by id
 */
const getClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  const { id } = req.params.id;

  try {
    let client = await Client.findOne({ id });
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json(error).send("There is no client with this id");
  }
};

/**
 * Get all clients
 */
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json(error).send("Sorry, something went wrong");
  }
};

/**
 * Create a client
 */
const newClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let client = await Client.findOne({ email });

    if (client) {
      return res
        .status(400)
        .json({ msg: "A client already exist with this email address" });
    }

    client = new Client(req.body);
    const salt = await bcryptjs.genSalt(10);
    client.password = await bcryptjs.hash(password, salt);
    await client.save();

    const payload = {
      cliente: {
        id: client.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Sorry, something went wrong");
  }
};

/**
 * Update client by id
 */
const updateClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  try {
    await Client.findByIdAndUpdate({ _id: req.params.id}, { $set: req.body }, { new: true });
    res.status(200).json("Client has been updated");
  } catch (error) {
    res.status(404).json(error).send("There is no client with this id");
  }
};

/**
 * Delete client by id
 */
const deleteClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  try {
    await Client.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json("Client has been deleted");
  } catch (error) {
    res.status(404).json(error).send("There is no client with this id");
  }
};

module.exports = {
  getClient,
  getAllClients,
  newClient,
  updateClient,
  deleteClient
};
