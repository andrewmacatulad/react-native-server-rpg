const Sequelize = require("sequelize");

const sequelize = require("../database/sequelizeDatabase");

const Character = sequelize.define("character", {
  character_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: { type: Sequelize.STRING, required: true },
  level: { type: Sequelize.INTEGER, defaultValue: 0 },
  xp: { type: Sequelize.INTEGER, defaultValue: 0 },
  money: { type: Sequelize.INTEGER, defaultValue: 0 }
  // email: Sequelize.STRING,
  // password: Sequelize.STRING,
  // name: Sequelize.STRING
});

module.exports = Character;
