const passport = require("passport");
const moment = require("moment");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");

module.exports = app => {
  app.post(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { name, gender, address, birthday } = req.body;

      const ageNow = moment().diff(birthday, "years");

      try {
        const profileCreate = await Profile.create({
          name,
          gender,
          address,
          birthday,
          age: ageNow,
          userId: req.user.dataValues.id
        });

        res.json(profileCreate);
      } catch (err) {
        console.log(err);
      }
    }
  );

  // test
  app.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const user = await Profile.findOne({
          where: { userId: req.user.dataValues.id }
        });

        res.send(user.dataValues);
      } catch (error) {
        res.status(421).send({ error: "Error" });
      }
    }
  );

  app.patch(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { name, gender, address, birthday, imageUrl } = req.body;

      const ageNow = moment().diff(birthday, "years");

      try {
        const userPicUpdate = await User.update(
          {
            profile_pic_url: imageUrl
          },
          { where: { id: req.user.dataValues.id } }
        );
      } catch (err) {
        console.log(err);
      }

      try {
        const userUpdate = await Profile.update(
          {
            name,
            gender,
            address,
            birthday,
            age: ageNow
          },
          { where: { userId: req.user.dataValues.id } }
        );

        res.json(userUpdate);
      } catch (err) {
        console.log(err);
      }
    }
  );

  app.get("/sample_profile", async (req, res) => {
    try {
      const test = await Profile.findAll({
        include: [
          {
            model: User,
            required: true // do an INNER Join
          }
        ],
        where: {
          userId: 1
        }
      });
      res.send(test);
    } catch (err) {
      console.log(err);
    }
  });
};
