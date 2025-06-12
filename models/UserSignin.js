const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserSignin = sequelize.define("UserSignin", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  UserSignin.associate = models => {
    UserSignin.hasMany(models.UserLogin, { foreignKey: 'signinId', targetKey: 'id' });
  };

  return UserSignin;
}