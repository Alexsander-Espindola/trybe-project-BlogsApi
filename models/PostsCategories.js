const PostsCategories = (sequelize, DataTypes) => sequelize.define('PostsCategories', {
  postId: DataTypes.INTEGER,
  categoryId: DataTypes.INTEGER,
});

module.exports = PostsCategories;