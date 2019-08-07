const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");

const server = express();
const sequelize = require("./database/sequelizeDatabase");

const User = require("./models/userModel");
const Attribute = require("./models/attributeModel");
const Profile = require("./models/profileModel");

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

server.use(cors({ origin: "http://localhost:3000", credentials: true }));

// server.use(cors());
// server.use(cookieParser())

server.use(bodyParser.json());

server.use(morgan("combined"));

server.use(passport.initialize());

require("./passport/passport");

require("./routes/authRoutes")(server);
require("./routes/jwtAuthRoutes")(server);
require("./routes/attributesRoutes")(server);
require("./routes/profileRoutes")(server);

server.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});
