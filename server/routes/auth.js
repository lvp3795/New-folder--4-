const express = require("express");
const router = express.Router();
const multer = require("multer");
const Img = require("../models/image");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "./images");
  },

  filename: function (request, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

const { login, register, getAllImage } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/getImg").get(getAllImage);
router.post("/upload", upload.single("add-images"), async (req, res) => {
  console.log(req.file.filename);
  const img = await Img.create({ img: req.file.filename });
  res.redirect("/");
});

module.exports = router;
