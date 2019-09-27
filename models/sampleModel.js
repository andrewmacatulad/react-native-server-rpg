const sequelize = require("../database/sequelizeDatabase");
const User = require("./userModel");
const Quest = require("./questModel");

const UserQuests = sequelize.define("userquests", {});
User.belongsToMany(Quest, {
  as: "UserQuest",
  through: "userquests",
  foreignKey: "userId"
});

Quest.belongsToMany(User, {
  as: "UserQuest",
  through: "userquests",
  foreignKey: "questId"
});

module.exports = UserQuests;
