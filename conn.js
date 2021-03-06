const mongoose = require("mongoose");

const db_path =
  process.env.MONGODB_URI || "mongodb://mongo:27017/express-mongo";

const config = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(db_path, config, (error) => {
  if (!error) {
    console.log("Successful connection.");
  } else {
    console.log("Erro connecting to database", error);
  }
});
