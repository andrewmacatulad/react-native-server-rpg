const Sequelize = require("sequelize");
const sequelize = require("../database/sequelizeDatabase");
const User = require("./userModel");
const Pet = require("./petCharacterModel");

const PetLikes = sequelize.define("petlikes", {
  status: Sequelize.BOOLEAN,
  dateLiked: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
});
User.belongsToMany(Pet, {
  as: "PetLikes",
  through: "petlikes",
  foreignKey: "userId"
});

Pet.belongsToMany(User, {
  as: "PetLikes",
  through: "petlikes",
  foreignKey: "petId"
});

module.exports = PetLikes;
