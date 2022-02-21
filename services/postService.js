const { Categories } = require('../models');
const {
  userNotFound,
  titleRequired,
  contentRequired,
  categoryIdsRequired,
  categoryIdNotFound,
} = require('./statusCode');

const findAll = async () => {
  const allCategories = await Categories.findAll({
    attributes: ['id', 'name'],
  });
  return allCategories;
};

const verifyCategories = async (categoryIds) => {
  const allCategories = await findAll();
  const returnCategories = [];
  const allCategoriesId = [];
  const allCategoriesName = [];
  allCategories.forEach(({ dataValues }) => {
    const { id, name } = dataValues;
    allCategoriesId.push(id);
    allCategoriesName.push(name);
  });
  categoryIds.forEach((id) => {
    const arrayPosition = allCategoriesId.indexOf(id);
    if (arrayPosition === -1) throw categoryIdNotFound;
    returnCategories.push({
      id: allCategoriesId[arrayPosition],
      name: allCategoriesName[arrayPosition],
    });
  });
  return returnCategories;
};

const verifyPost = async (title, content, categoryIds, findUser) => {
  if (!findUser) throw userNotFound;
  if (!title) throw titleRequired;
  if (!content) throw contentRequired;
  if (!categoryIds) throw categoryIdsRequired;

  const allCategories = await verifyCategories(categoryIds);
  return allCategories;
};

module.exports = {
  verifyPost,
};