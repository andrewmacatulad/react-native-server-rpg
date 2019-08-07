const passport = require("passport");
const Attributes = require("../models/attributeModel");

module.exports = app => {
  app.get(
    "/attributes",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const user = await Attributes.findOne({
          where: { userId: req.user.id }
        });
        console.log("attributes", user);
        res.send(user.dataValues);
      } catch (error) {
        next(error);
      }
    }
  );

  // app.post(
  //   "/attributes",
  //   passport.authenticate("jwt", { session: false }),
  //   async (req, res) => {
  //     const {
  //       strength,
  //       vitality,
  //       intelligence,
  //       spirit,
  //       luck,
  //       statPointsRemaining
  //     } = req.body;

  //     try {
  //       const userCreate = await Attributes.create({
  //         strength,
  //         vitality,
  //         intelligence,
  //         spirit,
  //         luck,
  //         statPointsRemaining,
  //         userId: req.user.dataValues.id
  //       });

  //       res.json(userCreate);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // );

  const sample = async (req, res, done) => {
    // if (req.body.strength > 2) {
    //   return res.json({ error: "Error" });
    // }
    // done();
    const {
      strength,
      vitality,
      intelligence,
      spirit,
      luck,
      statPointsRemaining
    } = req.body;

    // let str = 0;
    // statsCount(strength, "strength").then(data => {
    //   str = data;
    //   return data;
    // });
    const str = await statsCount(strength, "strength");
    const vit = await statsCount(vitality, "vitality");
    const int = await statsCount(intelligence, "intelligence");
    const spr = await statsCount(spirit, "spirit");
    const lck = await statsCount(luck, "luck");

    const allEqual = str + vit + int + spr + lck;

    if (allEqual > statPointsRemaining) {
      return res.json({ error: "Error" });
    }
    done();
  };

  const statsCount = async (stats, attribute) => {
    try {
      const user = await Attributes.findOne({
        where: { userId: 3 }
      });

      let sum = 0;
      let number = 0;
      switch (attribute) {
        case "strength":
          number = user.dataValues.strength;
          break;
        case "vitality":
          number = user.dataValues.vitality;
          break;
        case "intelligence":
          number = user.dataValues.intelligence;
          break;
        case "spirit":
          number = user.dataValues.spirit;
          break;
        case "luck":
          number = user.dataValues.luck;
          break;
        default:
          break;
      }

      while (number <= stats) {
        let i = 1;
        i = Math.floor((number / 10) % 10) + i;

        // console.log("Number ", number, " I ", i);
        sum += i;
        number++; // -- updater
      }
      // return { sum: sum };

      return sum;
      // console.log("attributes", user.dataValues`.${attribute}`);
      // res.send(`user.dataValues.${attribute}`);
      // console.log("Stats ", stats, " Attributes ", attribute);
    } catch (error) {
      console.log(error);
    }
  };
  app.get("/testingan", (req, res) => {
    // const a = 6;
    // const b = 20;
    // const c = [];
    // const d = 0;
    // // for (x = a; x <= b; x++) {
    // //   // console.log(x);
    // //   c.push(x);
    // // }

    // // console.log(c);
    // var sum = 0;
    // var number = 11;

    // while (number <= 31) {
    //   let i = 1;
    //   i = Math.floor((number / 10) % 10) + i;

    //   console.log("Number ", number, " I ", i);
    //   sum += i;
    //   number++; // -- updater
    // }

    // console.log("Sum = " + sum);

    res.send("tesingan lang");
  });
  app.post("/sample_sample", sample, (req, res) => {
    res.send("Sample");
  });
  app.patch(
    "/attributes",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const {
        strength,
        vitality,
        intelligence,
        spirit,
        luck,
        statPointsRemaining
      } = req.body;

      try {
        const userUpdate = await Attributes.update(
          {
            strength,
            vitality,
            intelligence,
            spirit,
            luck,
            statPointsRemaining
          },
          { where: { userId: req.user.dataValues.id } }
        );

        res.json(useUpdate);
      } catch (err) {
        console.log(err);
      }
    }
  );
};
