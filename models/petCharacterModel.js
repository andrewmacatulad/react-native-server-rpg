const Sequelize = require("sequelize");

const sequelize = require("../database/sequelizeDatabase");

const PetCharacter = sequelize.define("pet_character", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  petLevel: Sequelize.INTEGER,
  petExperience: Sequelize.INTEGER,
  petAchievements: Sequelize.STRING,
  petTraits: Sequelize.STRING

  //   petWinLost
  //   petSkills
});

module.exports = PetCharacter;
