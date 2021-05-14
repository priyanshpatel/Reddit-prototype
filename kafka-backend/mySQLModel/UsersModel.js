const Sequelize = require('sequelize');
const sequelize = require('../config/mysqldbconnection');

module.exports = () => {
  const Users = sequelize.define('Users', {
    user_id: {
      type: Sequelize.STRING(200),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
  });
  return Users;
};
