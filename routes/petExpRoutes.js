const passport = require("passport");
const Pet = require("../models/petProfileModel");
const PetChar = require("../models/petCharacterModel");
const expLevel = require("../experience");

module.exports = app => {
  app.get("/get_exp/:petId", async (req, res) => {
    const { petId } = req.params;
    // const petId = "f0066ceb-5b2c-4186-a1cf-90725a40b255";
    try {
      const test = await PetChar.findAll({
        include: [
          {
            model: Pet,
            required: true // do an INNER Join
          }
        ],
        where: {
          petId
        }
      });
      console.log(test[0].dataValues.pet.dataValues);
      res.send(test[0]);
    } catch (err) {
      console.log(err);
    }
  });
  app.post(
    "/add_petchar",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      // const petId = "f0066ceb-5b2c-4186-a1cf-90725a40b255";
      const { petId } = req.body;

      const petCharCreate = await PetChar.create({
        petLevel: 1,
        petExperience: 0,
        petAchievements: "none",
        petTraits: "none",
        petId
      });

      res.json(petCharCreate);
    }
  );

  app.put("/add_exp", async (req, res) => {
    const { experience, petId } = req.body;

    console.log("Exp ", experience, " PetID ", petId);
    // const { petCharId } = req.params
    // const petCharId = "8e614186-7250-4e9d-888c-2cd8d2cc361d";
    // f0066ceb-5b2c-4186-a1cf-90725a40b255

    let petCharExpUp;
    try {
      // petCharExpUp = await PetChar.update(
      //   {
      //     petExperience: petExperience + exp
      //   },

      //   { where: { id: petCharId } }
      // );
      petCharExpUp = await PetChar.findByPk(petId);

      await petCharExpUp.increment("petExperience", { by: experience });
      // petCharExpUp = await PetChar.update(
      //   {
      //     petExperience: petExperience + exp
      //   },
      //   { where: { id: petCharId } }
      // );
    } catch (err) {
      console.log(err);
    }

    let currentExp = 0;
    let exp_need = 0;
    let petChar;
    try {
      petChar = await PetChar.findOne({
        where: { id: petId }
      });

      exp_need = expLevel.experience[(await petChar.dataValues.petLevel) - 1];
      currentExp = petChar.dataValues.petExperience;
      // res.json({ currentExp, exp_need });
    } catch (error) {
      console.log(error);
    }

    console.log("Exp need ", exp_need, " Current_Exp ", currentExp);
    if (currentExp >= exp_need) {
      const experience = currentExp - exp_need;
      console.log(experience);
      let petCharLevelUp;
      try {
        petCharLevelUp = await PetChar.findByPk(petId);
        petCharLevelUp.increment("petLevel", { by: 1 });

        const petCharLevelUpExp = await PetChar.update(
          {
            petExperience: experience
          },
          { where: { id: petId } }
        );

        return res.json(petCharLevelUpExp);
      } catch (err) {
        console.log(err);
      }

      //
    }
    res.json(petChar);

    // const levelExp2 = await User.findById(req.user._id);
    // // const currentExp = levelExp2.experience;
    // // const exp_need = levelExp2.exp_to_level;

    // let addExp;
    // let expLevel;
    // addExp = await User.findOneAndUpdate(
    //   { _id: req.user._id },
    //   { $inc: { level: 1 }, experience }
    // );
    // expLevel = await Level.find({ level: addExp.level + 1 });
    // console.log(expLevel);
    // addExp = await User.findOneAndUpdate(
    //   { _id: req.user._id },
    //   { exp_to_level: expLevel[0].experience }
    // );
    // addExp = await User.findById(req.user._id);
    // console.log(addExp);
    // return res.json(addExp);
  });
};
