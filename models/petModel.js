const Sequelize = require("sequelize");

const sequelize = require("../database/sequelizeDatabase");

const Profile = sequelize.define("pets", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  petName: Sequelize.STRING,
  petPicture: Sequelize.STRING,
  petGender: Sequelize.STRING,
  petBirthday: Sequelize.STRING,
  petAge: Sequelize.INTEGER,
  petType: Sequelize.STRING,
  petStatus: Sequelize.STRING
});

module.exports = Profile;
