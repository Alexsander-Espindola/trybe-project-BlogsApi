const express = require('express');

const router = express();
const { Categories } = require('../models');
const authService = require('../services/authService');
// const {} = require('../services/categoriesService');

router.post('/', async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    await authService.verifyToken(authorization);

    const { name } = req.body;
    if (!name) return res.status(400).json({ message: '"name" is required' });
    const postCategorie = await Categories.create({ name });

    return res.status(201).json(postCategorie);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

module.exports = router;