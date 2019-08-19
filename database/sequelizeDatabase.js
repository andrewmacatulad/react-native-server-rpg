const Sequelize = require("sequelize");

const opts = {
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true
  }
};

// const sequelize = new Sequelize("sample_schema", "root", "root", {
//   dialect: "mysql",
//   host: "localhost",
//   define: {
//     freezeTableName: true,
//     timestamps: false
//   }
// });

const sequelize = new Sequelize("social-app", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
  define: {
    freezeTableName: true,
    timestamps: false
  }
});

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   dialect: "postgres",
//   protocol: "postgres",
//   host: "https://mighty-bayou-22851.herokuapp.com",
//   define: {
//     freezeTableName: true,
//     timestamps: false
//   }
// });

module.exports = sequelize;
