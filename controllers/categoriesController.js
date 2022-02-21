const express = require('express');

const router = express();
const { Categories } = require('../models');
const authService = require('../services/authService');

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

router.get('/', async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    await authService.verifyToken(authorization);

    const categories = await Categories.findAll({
      attributes: { exclude: ['updatedAt', 'createdAt'] },
    });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

module.exports = router;