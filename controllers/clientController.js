const Client = require("../models/mongo/Client");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

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

const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json(error).send("Sorry, something went wrong");
  }
};

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

const deleteClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ msg: errors.array() });
  }

  //const { id } = req.params.id;

  try {
    await Client.findByIdAndRemove(req.params._id);
    res.status(200).json("Client has been deleted");
  } catch (error) {
    res.status(404).json(error).send("There is no client with this id");
  }
};

module.exports = {
  getClient,
  getAllClients,
  newClient,
  deleteClient
};
