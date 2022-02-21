const BlogPosts = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPosts', {
    UsersId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    createdAt: 'published',
    updatedAt: 'updated',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users, { primaryKey: 'id', as: 'user' });
  };

  return BlogPost;
};

module.exports = BlogPosts;
