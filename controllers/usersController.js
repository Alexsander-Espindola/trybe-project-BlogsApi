const express = require('express');
const authService = require('../services/authService');

const router = express.Router();
const { Users } = require('../models');
const { verifyUser } = require('../services/userService');

router.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    await verifyUser(displayName, email, password);

    const { dataValues } = await Users.create({ displayName, email, password, image });
    const { password: _password, ...userWithoutPassword } = dataValues;
    const token = authService.genToken(userWithoutPassword);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

module.exports = router;
