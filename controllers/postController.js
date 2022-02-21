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
    const findUser = await Users.findOne({
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      where: { email },
    });
    const categories = await verifyPost(title, content, categoryIds, findUser);
    const { id, dataValues } = findUser;
    console.log(dataValues);

    const createPost = await BlogPosts
      .create({ title, content, userId: id, user: dataValues, categories });

    return res.status(201).json(createPost);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    await authService.verifyToken(authorization);
    // const findUserPost = await Users.findAll({ where: { email } });
    const findBlogPost = await BlogPosts.findAll({});

    return res.status(200).json(findBlogPost);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

module.exports = router;