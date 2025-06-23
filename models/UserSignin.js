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
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return UserSignin;
}