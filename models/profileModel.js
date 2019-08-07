const Sequelize = require("sequelize");

const sequelize = require("../database/sequelizeDatabase");

const Profile = sequelize.define("profiles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  gender: Sequelize.STRING,
  birthday: Sequelize.STRING,
  age: Sequelize.INTEGER,
  address: Sequelize.STRING
});

module.exports = Profile;
