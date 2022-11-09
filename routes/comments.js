const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisementController');
const { check } = require('express-validator');

router.put('/:id', [check('text', 'The text field is required').not().isEmpty()], advertisementController.addComment);

module.exports = router;
