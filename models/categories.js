const Categories = (sequelize, DataTypes) => sequelize.define('Categories', {
  name: DataTypes.STRING,
});

module.exports = Categories;