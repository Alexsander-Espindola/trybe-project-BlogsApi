const { Categories, BlogPosts, Users } = require('../models');
const {
  userNotFound,
  titleRequired,
  contentRequired,
  categoryIdsRequired,
  categoryIdNotFound,
  postNotFound,
  invalidUser,
  categoryIdCannotEdited,
} = require('./statusCode');

const findAll = async () => {
  const allCategories = await Categories.findAll({
    attributes: ['id', 'name'],
  });
  return allCategories;
};

const verifyCategories = async (categoryIds) => {
  const allCategories = await findAll();
  const allCategoriesId = [];
  allCategories.forEach(({ dataValues: { id } }) => {
    allCategoriesId.push(id);
  });
  categoryIds.forEach((id) => {
    const arrayPosition = allCategoriesId.indexOf(id);
    if (arrayPosition === -1) throw categoryIdNotFound;
  });
};

const verifyPost = async (title, content, categoryIds, findUser) => {
  if (!findUser) throw userNotFound;
  if (!title) throw titleRequired;
  if (!content) throw contentRequired;
  if (!categoryIds) throw categoryIdsRequired;

  await verifyCategories(categoryIds);
};

const findById = async (id) => {
  const getPostById = await BlogPosts.findAll({
    where: { id },
    include: [
      { 
        model: Users,
        as: 'user',
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (getPostById.length === 0) throw postNotFound;
  return getPostById[0];
};

const verifyUser = async (id, email) => {
  const findPost = await BlogPosts.findOne({ where: { id } });
  const findUser = await Users.findOne({ where: { email } });
  if (findPost.userId !== findUser.id) throw invalidUser;
};

const updatePost = async (id, email, post, categoryIds) => {
  const { title, content } = post;
  if (categoryIds) throw categoryIdCannotEdited;
  if (!title) throw titleRequired;
  if (!content) throw contentRequired;
  const updated = Date.now();
  await verifyUser(id, email);
  await BlogPosts.update(
    { ...post, updated },
    { where: { id } },
  );
  const updatedPost = await findById(id);

  return updatedPost;
};

const deletePost = async (id, email) => {
  const post = await Users.findOne({ where: { id } });

  if (!post) throw postNotFound;

  await verifyUser(id, email);

  await BlogPosts.destroy({ where: { id } });
};

module.exports = {
  verifyPost,
  findById,
  updatePost,
  deletePost,
};