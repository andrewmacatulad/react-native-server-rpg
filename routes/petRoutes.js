const passport = require("passport");
const moment = require("moment");
const Pet = require("../models/petProfileModel");

module.exports = app => {
  app.post(
    "/pets",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { petName, petPicture, petGender, petBirthday } = req.body;

      const ageNow = moment().diff(petBirthday, "years");

      let userKo = 2;
      try {
        const petsNameDouble = await Pet.findAll({
          where: { userId: req.user.dataValues.id, petName }
        });

        if (petsNameDouble.length === 1) {
          return res
            .status(400)
            .send({ error: "Can't have the same pet name" });
        }
        const pets = await Pet.findAll({
          where: { userId: req.user.dataValues.id }
        });
        let petCreate;
        switch (pets.length) {
          case 0:
            petCreate = await Pet.create({
              petName,
              petPicture,
              petType: "dog",
              petGender,
              petBirthday,
              petAge: ageNow,
              petStatus: "First",
              userId: req.user.dataValues.id
            });

            return res.json(petCreate);
          case 1:
            // console.log("dalawa");
            // return res.send("Dalawa");
            petCreate = await Pet.create({
              petName,
              petPicture,
              petType: "dog",
              petGender,
              petBirthday,
              petAge: ageNow,
              petStatus: "Second",
              userId: req.user.dataValues.id
            });

            return res.json(petCreate);
          case 2:
            // console.log("dalawa");
            // return res.send("Dalawa");
            petCreate = await Pet.create({
              petName,
              petPicture,
              petType: "dog",
              petGender,
              petBirthday,
              petAge: ageNow,
              petStatus: "Third",
              userId: req.user.dataValues.id
            });

            return res.json(petCreate);
          case 3:
            // return res.send("Tatlo");
            return res
              .status(401)
              .json({ error: "Only 3 pets allowed can't create another pet" });
          default:
            return res.send("Mali");
        }
        // const petCreate = await Pet.create({
        //   petName,
        //   petPicture,
        //   petType: "daily",
        //   petGender,
        //   // petBirthday,
        //   // petAge: ageNow,
        //   userId: 1
        // });

        // res.json(petCreate);
        // console.log(petFindDuplicate.length);
      } catch (err) {
        console.log(err);
      }
    }
  );

  app.get(
    "/pets",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      console.log(req.user.dataValues.id);
      try {
        const user = await Pet.findAll({
          where: { userId: req.user.dataValues.id }
        });

        res.send(user);
      } catch (error) {
        res.status(421).send({ error: "Error" });
      }
    }
  );

  app.get(
    "/pet/:petId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { petId } = req.params;
      console.log("Params ", petId);
      try {
        const pet = await Pet.findOne({
          where: { id: petId }
        });
        console.log("pets ", pet.dataValues);
        res.send(pet.dataValues);
      } catch (error) {
        console.log(error);
      }
    }
  );

  app.patch(
    "/pet",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { petPicture, petId } = req.body;

      try {
        const petUpdate = await Pet.update(
          {
            petPicture
          },
          { where: { userId: req.user.dataValues.id, id: petId } }
        );

        if (petUpdate[0] === 1) {
          const getUpdate = await Pet.findOne({
            where: { userId: req.user.id }
          });

          return res.json(getUpdate);
        }
      } catch (err) {
        console.log(err);
      }
    }
  );

  const expLevel = require("../experience");
  app.get("/experience", async (req, res) => {
    // let exp = 50;
    // let level = 1;
    // let expArr = [];
    // let levelArr = [];
    // for (let i = 1; i <= 100; i++) {
    //   // const expLevel = await Level.find({ level: i });

    //   exp = exp * 1.2;
    //   expArr.push(Math.trunc(exp));
    //   level = i;
    //   levelArr.push(level);
    // }
    res.json(expLevel);
  });

  app.delete(
    "/pet_delete/:petId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { petId } = req.params;

      try {
        // sample.name = name;
        // sample.address = address;
        // // res.send("Updated ", sample);
        // return await sample.save();
        const sample = await Pet.destroy({ where: { id: petId } });
        return res.status(201).json({
          error: false,
          message: "Pet has been deleted"
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
};
