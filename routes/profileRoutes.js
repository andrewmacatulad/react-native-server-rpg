const passport = require("passport");
const moment = require("moment");
const Profile = require("../models/profileModel");

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
      const { name, gender, address, birthday } = req.body;

      const ageNow = moment().diff(birthday, "years");

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
};
