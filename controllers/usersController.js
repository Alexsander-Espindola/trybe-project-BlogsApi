const express = require('express');

const router = express.Router();
const { Users } = require('../models');
const { verifyUser } = require('../services/userService');

router.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    await verifyUser(displayName, email, password, image);

    const { dataValues } = await Users.create({ displayName, email, password, image });

    return res.status(201).json(dataValues);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

module.exports = router;