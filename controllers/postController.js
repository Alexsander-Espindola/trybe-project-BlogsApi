const express = require('express');

const router = express();
const authService = require('../services/authService');
const { BlogPosts, Users } = require('../models');
const { verifyPost } = require('../services/postService');

router.post('/', async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const email = await authService.verifyToken(authorization);

    const { title, content, categoryIds } = req.body;
    const findUser = await Users.findOne({ where: { email } });
    await verifyPost(title, content, categoryIds, findUser);
    const { id } = findUser;

    const createPost = await BlogPosts.create({ userId: id, title, content });

    return res.status(201).json(createPost);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

module.exports = router;