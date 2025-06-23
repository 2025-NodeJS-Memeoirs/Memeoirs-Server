const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,
});

const UserSignin = require('./UserSignin')(sequelize);
const Post = require('./Post')(sequelize);

const models = { sequelize, UserSignin, Post };

// 관계 설정 호출 (여기서 associate 실행)
// Object.values(models).forEach(model => {
//   if (typeof model.associate === 'function') {
//     model.associate(models);
//   }
// });

module.exports = models;