const Sequelize = require("sequelize");

const sequelize = require("../database/sequelizeDatabase");

const PetAttack = sequelize.define("pet_attacks", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  petAttack1: Sequelize.STRING,
  petAttack2: Sequelize.STRING,
  petSpecial1: Sequelize.STRING,
  petSpecial2: Sequelize.STRING

  //   petWinLost
  //   petSkills
});

module.exports = PetAttack;
