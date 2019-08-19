const Sequelize = require("sequelize");

const sequelize = require("../database/sequelizeDatabase");

const Quest = sequelize.define("quests", {
  // id: {
  //   type: Sequelize.INTEGER,
  //   autoIncrement: true,
  //   allowNull: false,
  //   primaryKey: true
  // },
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  questTitle: Sequelize.STRING,
  questObjective: Sequelize.STRING,
  questType: {
    type: Sequelize.ENUM,
    values: ["daily", "weekly", "monthly", "yearly"],
    defaultValue: "daily"
  },
  questTimeDuration: Sequelize.INTEGER,
  questStatus: {
    type: Sequelize.ENUM,
    values: ["ongoing", "onhold", "cancelled", "finished"],
    defaultValue: "ongoing"
  },
  questStarted: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  questFinished: Sequelize.DATE
});

module.exports = Quest;
