const Client = require('../models/Client');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

/**
 * Get client by id
 */
const getClient = async (req, res) => {
  try {
    let client = await Client.findOne({ _id: req.params.id }).select('-password');
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json(error).send('There is no client with this id');
  }
};

/**
 * Get all clients
 */
const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().select('-password');
    res.status(200).json(clients);
  } catch (error) {
    res.status(422).json({ msg: 'Sorry, something went wrong' });
  }
};

/**
 * Create a client
 */
const newClient = async (req, res) => {
  const { email, password } = req.body;
  try {
    let client = await Client.findOne({ email });

    if (client) {
      return res.status(409).json({ msg: 'A client already exist with this email address' });
    }
    client = new Client(req.body);
    const salt = await bcryptjs.genSalt(10);
    client.password = await bcryptjs.hash(password, salt);
    await client.save();
    res.status(201).json({
      msg: `Client created`
    });
  } catch (error) {
    console.log(error);
    res.status(422).json({ msg: 'Sorry, something went wrong' });
  }
};

/**
 * Update client by id
 */
const updateClient = async (req, res) => {
  try {
    await Client.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true });
    res.status(200).json({ msg: 'Client has been updated' });
  } catch (error) {
    res.status(422).json({ msg: 'Sorry, something went wrong' });
  }
};

/**
 * Delete client by id
 */
const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ msg: 'Client has been deleted' });
  } catch (error) {
    res.status(404).json(error).send('There is no client with this id');
  }
};

module.exports = {
  getClient,
  getAllClients,
  newClient,
  updateClient,
  deleteClient
};
