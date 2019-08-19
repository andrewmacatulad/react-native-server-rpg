const passport = require("passport");
const Quest = require("../models/questModel");

module.exports = app => {
  app.patch(
    "/quest/:questId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { status } = req.body;
      const { questId } = req.params;

      console.log("Status ", status, " QuestId ", questId);
      try {
        const questUpdate = await Quest.update(
          {
            questStatus: status.status,
            questFinished: Date.now()
          },
          { where: { userId: req.user.dataValues.id, id: questId } }
        );

        res.json(questUpdate);
      } catch (err) {
        console.log(err);
      }
    }
  );

  app.get(
    "/quest/:questId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { questId } = req.params;
      console.log("Params ", questId);
      try {
        const quest = await Quest.findOne({
          where: { userId: req.user.id, id: questId }
        });
        console.log("quests ", quest.dataValues);
        res.send(quest.dataValues);
      } catch (error) {
        console.log(error);
      }
    }
  );

  app.get(
    "/quests/:type",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const { type } = req.params;
      console.log(type);
      try {
        const quest = await Quest.findAll({
          where: { userId: req.user.id, questType: type }
        });
        // console.log("quests ", quest);
        res.send(quest);
      } catch (error) {
        console.log(error);
      }
    }
  );

  app.get("/quests", async (req, res) => {
    try {
      const quests = await Quest.findAll();
      // console.log("quests ", quests);
      res.json(quests);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/quests_cleared", async (req, res) => {
    try {
      const quests = await Quest.findAll({
        where: { questStatus: "ongoing" }
      });
      // console.log("quests ", quests);
      console.log(quests);
      res.json(quests);
    } catch (error) {
      console.log(error);
    }
  });

  app.post(
    "/quest",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const {
        questTitle,
        questObjective,
        questType,
        questTimeDuration,
        questStatus
      } = req.body;

      console.log(questType);
      console.log(req.user.id);
      try {
        const questCreate = await Quest.create({
          questTitle,
          questObjective,
          questType,
          questTimeDuration,
          questStatus,
          userId: req.user.id
        });

        res.json(questCreate);
      } catch (err) {
        console.log(err);
      }
    }
  );
};
