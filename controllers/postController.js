const express = require('express');

const router = express();
const authService = require('../services/authService');
const { BlogPosts, Users, Categories } = require('../models');
const { verifyPost, findById, updatePost } = require('../services/postService');

router.post('/', async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const email = await authService.verifyToken(authorization);

    const { title, content, categoryIds } = req.body;
    const findUser = await Users.findOne({
      attributes: { exclude: ['updatedAt', 'createdAt'] },
      where: { email },
    });
    await verifyPost(title, content, categoryIds, findUser);
    const { id, dataValues } = findUser;
    console.log(dataValues);

    const createPost = await BlogPosts
      .create({ title, content, userId: id });

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
    const findBlogPost = await BlogPosts.findAll({
      include: [
        { 
          model: Users,
          as: 'user',
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
    });

    return res.status(200).json(findBlogPost);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    await authService.verifyToken(authorization);

    const { id } = req.params;
    const getPostByid = await findById(id);

    return res.status(200).json(getPostByid);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const email = await authService.verifyToken(authorization);
    const { id } = req.params;
    const { title, content, categoryIds } = req.body;

    const updatedPost = await updatePost(id, email, { title, content }, categoryIds);

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
});

module.exports = router;