const { Categories } = require('../models');
const {
  userNotFound,
  titleRequired,
  contentRequired,
  categoryIdsRequired,
  categoryIdNotFound,
} = require('./statusCode');

const verifyCategories = async (categoryIds) => {
  const findAll = await Categories.findAll({
    attributes: ['id'],
  });
  const allCategoriesId = [];
  findAll.forEach(({ dataValues: { id } }) => {
    allCategoriesId.push(id);
  });
  categoryIds.forEach((id) => {
    const test = allCategoriesId.indexOf(id);
    if (test === -1) throw categoryIdNotFound;
  });
};

const verifyPost = async (title, content, categoryIds, findUser) => {
  if (!findUser) throw userNotFound;
  if (!title) throw titleRequired;
  if (!content) throw contentRequired;
  if (!categoryIds) throw categoryIdsRequired;

  await verifyCategories(categoryIds);
};

module.exports = {
  verifyPost,
};