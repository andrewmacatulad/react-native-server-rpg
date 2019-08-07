const Sequelize = require("sequelize");

const sequelize = require("../database/sequelizeDatabase");

const Attributes = sequelize.define("attributes", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  strength: { type: Sequelize.INTEGER, defaultValue: 1 },
  vitality: { type: Sequelize.INTEGER, defaultValue: 1 },
  intelligence: { type: Sequelize.INTEGER, defaultValue: 1 },
  spirit: { type: Sequelize.INTEGER, defaultValue: 1 },
  luck: { type: Sequelize.INTEGER, defaultValue: 1 },
  statPointsRemaining: { type: Sequelize.INTEGER, defaultValue: 100 },
  level: { type: Sequelize.INTEGER, defaultValue: 1 }
  // email: Sequelize.STRING,
  // password: Sequelize.STRING,
  // name: Sequelize.STRING
});

module.exports = Attributes;
