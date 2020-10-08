const express = require("express");
const bodyParser = require("body-parser");

const conn = require("./conn");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

require("dotenv").config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.options("*", cors());
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
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

app.listen(port, () => {
  console.log(`Express running on: http://localhost:${port}`);
});
