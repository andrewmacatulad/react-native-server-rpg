const passport = require("passport");
const Pet = require("../models/petProfileModel");
const PetChar = require("../models/petCharacterModel");
const expLevel = require("../experience");
const SampleTest = require("../models/sampleModel");
const PetLikes = require("../models/petLikesModel");
const User = require("../models/userModel");
const Quest = require("../models/questModel");

const sequelize = require("../database/sequelizeDatabase");

module.exports = app => {
  app.post(
    "/pet_likes",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { petId } = req.body;
      console.log(req.user.id);
      console.log(petId);
      try {
        const petLiked = await PetLikes.create({
          userId: req.user.id,
          petId,
          status: true
        });
        console.log(petLiked.dataValues);
        res.json(petLiked);
      } catch (err) {
        console.log(err);
      }
    }
  );

  // app.delete(
  //   "/pet_delete/:petId",
  //   passport.authenticate("jwt", { session: false }),
  //   async (req, res) => {
  //     const { petId } = req.params;

  //     try {
  //       // sample.name = name;
  //       // sample.address = address;
  //       // // res.send("Updated ", sample);
  //       // return await sample.save();
  //       const sample = await Pet.destroy({ where: { id: petId } });
  //       return res.status(201).json({
  //         error: false,
  //         message: "Pet has been deleted"
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // );

  app.delete(
    "/pet_likes/:petId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { petId } = req.params;

      console.log(petId);
      try {
        const petUnlike = await PetLikes.destroy({
          where: { userId: req.user.id, petId }
        });

        return res.status(201).json({
          error: false,
          message: "Pet Like has been deleted"
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

  app.post("/sample_test", async (req, res) => {
    let userId = 1;
    let questId = "937e30ca-90eb-4775-aee7-b63249402d8d";
    try {
      const petCharCreate = await SampleTest.create({
        userId,
        questId
      });
      res.json(petCharCreate);
    } catch (err) {
      console.log(err);
    }
  });

  app.delete("/sample_test", async (req, res) => {
    let userId = 1;
    let questId = "937e30ca-90eb-4775-aee7-b63249402d8d";
    try {
      const petCharCreate = await SampleTest.destroy({
        where: { userId, questId }
      });

      return res.status(201).json({
        error: false,
        message: "Pet has been deleted"
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.get("/sample_test", async (req, res) => {
    let userId = 1;
    let questId = "420fe174-6db7-4c6c-bc09-786efee08299";
    try {
      // const test = await SampleTest.findAll({});
      // console.log(test[0].dataValues);
      // res.send(test[0].dataValues);

      // const test = await Quest.findAll({
      //   include: [
      //     {
      //       model: User
      //       // through: {
      //       //   where: { id: userId }
      //       // }
      //     }
      //   ]
      // });
      // const test = await User.findAll({
      //   include: [
      //     {
      //       model: Quest,
      //       as: "UserQuest"
      //       // through: {
      //       //   where: { id: userId }
      //       // }
      //     }
      //   ]
      // });
      // const test = await Quest.findAll({
      //   include: [
      //     {
      //       model: User,
      //       as: "UserQuest",
      //       through: {
      //         where: { questId: "937e30ca-90eb-4775-aee7-b63249402d8d" }
      //       }
      //     }
      //   ]
      // });

      // const test = await Quest.findOne({
      //   where: { id: "937e30ca-90eb-4775-aee7-b63249402d8d" },
      //   attributes: ["questTitle", "questObjective", "questType"],
      //   include: [
      //     {
      //       model: User,
      //       // as: ["UserQuest"]
      //       as: "UserQuest",
      //       through: {
      //         // UserQuest: ["userId"],
      //         where: { userId: 3 }
      //       },
      //       attributes: ["username", "name", "google_id"]
      //     }
      //   ]
      // });

      // // Count Group By
      // const test = await SampleTest.findAll({
      //   group: ["questId", "userId"],
      //   attributes: [
      //     "questId",
      //     "userId",
      //     [sequelize.fn("COUNT", "questId"), "questLikes"]
      //   ]
      // });

      // const test = await PetLikes.findAll({
      //   group: ["userId"],
      //   attributes: ["userId", [sequelize.fn("COUNT", "userId"), "questLikes"]]
      // });

      // const test = await PetChar.findAll({
      //   where: {
      //     petId: "f0066ceb-5b2c-4186-a1cf-90725a40b255"
      //   },
      //   include: [
      //     {
      //       model: Pet,
      //       required: true // do an INNER Join
      //     },

      //     {
      //       model: User,
      //       // as: ["UserQuest"]
      //       as: "PetLikes"
      //     }
      //   ]
      //   // group: ["petLevel"],
      //   // attributes: {
      //   //   include: ["petLevel", [sequelize.fn("COUNT", "petLevel"), "numLikes"]]
      //   // }
      // });

      const test = await PetChar.findAll({
        where: {
          petId: "f0066ceb-5b2c-4186-a1cf-90725a40b255"
        },
        include: [
          {
            model: Pet,
            required: true // do an INNER Join
          },

          {
            model: User,
            // as: ["UserQuest"]
            as: "PetLikes"
          }
        ],
        group: ["PetLikes.id"],
        having: sequelize.where(
          sequelize.fn("COUNT", sequelize.col("PetLikes.username")),
          ">=",
          6
        )
      });

      //console.log(test);
      res.send(test);
      // const test = await SampleTest.findAll({
      //   include: [Quest]
      // });
      // console.log(test);
      // res.send(test);
    } catch (err) {
      console.log(err);
    }
  });
  app.get(
    "/get_exp/:petId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { petId } = req.params;
      // const petId = "f0066ceb-5b2c-4186-a1cf-90725a40b255";
      console.log(req.user.id);
      console.log("Pet char get ", petId);
      try {
        // const petChar = await PetChar.findAll({
        //   include: [
        //     {
        //       model: Pet,
        //       required: true // do an INNER Join
        //     }
        //   ],
        //   where: {
        //     petId
        //   }
        // });
        // console.log(petChar[0].dataValues.pet.dataValues);
        // res.send(petChar[0]);

        // const test = await SampleTest.findAll({
        //   group: ["userId"],
        //   attributes: ["userId", [sequelize.fn("COUNT", "userId"), "questLikes"]]
        // });

        const petChar = await PetChar.findAll({
          where: {
            petId
          },
          include: [
            {
              model: Pet,
              required: true // do an INNER Join
            },
            {
              model: User,
              // as: ["UserQuest"]
              as: "PetLikes",
              through: {
                // UserQuest: ["userId"],
                where: { userId: req.user.id }
              }
            }
          ]

          // include: [
          //   {
          //     model: User,
          //     // as: ["UserQuest"]
          //     as: "UserQuest",
          //     through: {
          //       // UserQuest: ["userId"],
          //       where: { userId: 3 }
          //     }
          //   }
          // ]
        });

        res.send(petChar[0]);
      } catch (err) {
        console.log(err);
      }
    }
  );
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
