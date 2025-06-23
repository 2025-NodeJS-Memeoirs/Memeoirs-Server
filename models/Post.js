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
    }, {
      timestamps: true, // createdAt, updatedAt을 자동으로 생성
    });

    Comment.associate = (models) => {
    // 하나의 사용자는 여러 개의 댓글 가능 (N:1 관계)
    Comment.belongsTo(models.UserSignin, { 
      foreignKey: 'userId'
    });
    
    // 하나의 게시물에 여러 개의 댓글 가능 (N:1 관계)
    Comment.belongsTo(models.Post, { 
      foreignKey: 'postId'
    });
  };

  return Comment;
};