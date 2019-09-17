const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const server = express();
const sequelize = require("./database/sequelizeDatabase");

const User = require("./models/userModel");
const Attribute = require("./models/attributeModel");
const Quest = require("./models/questModel");
const Profile = require("./models/profileModel");
const Pet = require("./models/petProfileModel");
const PetChar = require("./models/petCharacterModel");

const port = process.env.PORT || 5000;

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    server.listen(port);
  })
  .catch(err => {
    console.log(err);
  });

Attribute.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Profile.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
Pet.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// Quest.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
PetChar.belongsTo(Pet, { constraints: true, onDelete: "CASCADE" });
Quest.belongsTo(User, {
  as: "User",
  foreignKey: "userId"
});

server.use(cors({ origin: "http://localhost:3000", credentials: true }));
// server.use(
//   cors({ origin: "https://social-rpg-123.s3.amazonaws.com", credentials: true })
// );

// server.use(cors());
// server.use(cookieParser())

server.use(bodyParser.json());

server.use(morgan("combined"));

server.use(passport.initialize());

require("./passport/passport");

require("./routes/authRoutes")(server);
require("./routes/jwtAuthRoutes")(server);
require("./routes/attributesRoutes")(server);
require("./routes/petRoutes")(server);
require("./routes/petExpRoutes")(server);
require("./routes/profileRoutes")(server);
require("./routes/questRoutes")(server);
require("./routes/albumRoutes")(server);

server.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});
