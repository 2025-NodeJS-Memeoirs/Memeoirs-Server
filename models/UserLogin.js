const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserLogin = sequelize.define("UserLogin", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

  UserLogin.associate = models => {
    UserLogin.belongsTo(models.UserSignin, { foreignKey: 'signinId', sourceKey: 'id' });
  };

  return UserLogin;
}