const BlogPosts = (sequelize, DataTypes) => sequelize.define('BlogPosts', {
  userId: DataTypes.INTEGER,
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  published: DataTypes.DATE,
  updated: DataTypes.DATE,
  user: DataTypes.JSON,
  categories: DataTypes.JSON,
}, {
  createdAt: 'published',
  updatedAt: 'updated',
});

module.exports = BlogPosts;