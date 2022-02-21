const BlogPosts = (sequelize, DataTypes) => sequelize.define('BlogPosts', {
  userId: DataTypes.INTEGER,
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  published: DataTypes.DATE,
});

module.exports = BlogPosts;