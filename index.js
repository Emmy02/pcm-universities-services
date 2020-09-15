const express = require("express");
const bodyParser = require("body-parser");

const conn = require("./conn");
const mongoose = require("mongoose");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// Importing models and controllers
const models = require("./models/university")(app, mongoose);
const UniversityCtrl = require("./controllers/universities");

const router = express.Router();

const port = process.env.PORT || 3000;

router.get("/", (req, res) => {
  res.json({ message: "hello world" });
});
app.use(router);

const universities = express.Router();

universities
  .route("/universities")
  .get(UniversityCtrl.findAllUniversities)
  .post(UniversityCtrl.addUniversity);

universities
  .route("/universities_bulk")
  .post(UniversityCtrl.addUniversitiesBulk);

universities
  .route("/universities/:id")
  .get(UniversityCtrl.findById)
  .put(UniversityCtrl.updateUniversity)
  .delete(UniversityCtrl.deleteUniversity);

app.use("/api", universities);

app.listen(port, () => {
  console.log(`Express running on: http://localhost:${port}`);
});
