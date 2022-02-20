const express = require('express');
const authService = require('../services/authService');

const router = express.Router();
const { Users } = require('../models');
const { verifyUser, verifyToken, findById } = require('../services/userService');

router.post('/', async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    await verifyUser(displayName, email, password);

    await Users.create({ displayName, email, password, image });
    const token = authService.genToken(email);

    return res.status(201).json({ token });
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    await verifyToken(authorization);

    const users = await Users.findAll({
      attributes: { exclude: ['updatedAt', 'createdAt'] },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    await verifyToken(authorization);

    const { id } = req.params;
    const getUserByid = await findById(id);

    return res.status(200).json(getUserByid);
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;
