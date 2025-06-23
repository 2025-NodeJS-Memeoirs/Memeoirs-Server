const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define("Comment", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT, 
        allowNull: false,
      },
    }, {
      timestamps: true, // createdAt, updatedAt을 자동으로 생성
    });

    Comment.associate = (models) => {
    // UserSignin의 userId와 연결, 하나의 사용자는 여러 개의 댓글 가능 (N:1 관계)
    Comment.belongsTo(models.UserSignin, { 
      foreignKey: 'userId',
      targetKey: 'userId',
    });
    
    // Post의 id의 연결, 하나의 게시물에 여러 개의 댓글 가능 (N:1 관계)
    Comment.belongsTo(models.Post, { 
      foreignKey: 'postId'
    });
  };

  return Comment;
};