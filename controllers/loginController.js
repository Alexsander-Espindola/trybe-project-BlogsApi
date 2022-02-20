const express = require('express');
const authService = require('../services/authService');

// const { Users } = require('../models');
const { verifyLogin } = require('../services/loginService');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await verifyLogin(email, password);

    const token = authService.genToken(email);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

module.exports = router;
