const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Post = sequelize.define("Post", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
      keywords: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      coverImg: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      timestamps: true, // createdAt, updatedAt을 자동으로 생성
    });

    Post.associate = (models) => {
        // Post : Comment = 1 : N
        Post.hasMany(models.Comment, {
          foreignKey: 'postId',
          onDelete: 'CASCADE'
        });
    
        // Post : UserSignin = N : 1
        Post.belongsTo(models.UserSignin, {
          foreignKey: 'userId'
        });
      };
    
      return Post;
};