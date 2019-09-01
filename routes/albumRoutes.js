// Album Title
// Album Description
// Album Header Image

// Image Urls
// Image Sequence
// AlbumId - FK

const uuid = require("uuid/v1");
const AWS = require("aws-sdk");
const passport = require("passport");
const keys = require("../config/keys");
const cors = require("cors");
// const ImageModel = require("../models/imageModel");

const s3 = new AWS.S3({
  accessKeyId: keys.awsAccessKeyId,
  secretAccessKey: keys.awsSecretKey,
  region: "us-east-2"
});
// const key = `${req.user.id}/${uuid()}.jpeg`;
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "social-rpg-123",
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     metadata: function(req, file, cb) {
//       // console.log("Upload ", file);
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function(req, file, cb) {
//       //   cb(null, Date.now().toString());
//       cb(null, `test-123/${uuid()}_${file.originalname}`);
//       //   cb(null, `${Date.now().toString()}${file.originalname}`);
//     }
//   })
// });

// amazonS3Config.RegionEndpoint = RegionEndpoint.USEast1;

module.exports = server => {
  server.get(
    "/api/upload",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      cors();
      const key = `${req.user.id}/${uuid()}.jpeg`;
      // console.log("Image Up", s3);
      console.log(key);
      s3.getSignedUrl(
        "putObject",
        {
          Bucket: "social-rpg-123",
          ContentType: "image/jpeg",
          Key: key
        },

        (err, url) => {
          console.log(err, url);
          return res.send({ key, url });
        }
      );
    }
  );

  // server.get("/get_images", async (req, res) => {
  //   const images = await ImageModel.findAll();

  //   try {
  //     res.json(images);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  // server.get("/api/me", (req, res) => {
  //   console.log("Auth", req.isAuthenticated());
  //   // console.log(req.user);
  //   if (!req.user) {
  //     return res.status(404).json({ error: "Error" });
  //   }
  //   res.json(req.user);
  // });
  // server.get("/logout", (req, res) => {
  //   console.log("User ", req.user);
  //   req.session.destroy();
  //   req.logout();
  //   // req.session = null;

  //   res.redirect("/");
  // });
};
