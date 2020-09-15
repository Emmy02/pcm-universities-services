const mongoose = require("mongoose");

const db_path = "mongodb://localhost/express-mongo";

const config = {
  useUnifiedTopology: true,
};

mongoose.connect(db_path, config, (error) => {
  if (!error) {
    console.log("Successful connection.");
  } else {
    console.log("Erro connecting to database", error);
  }
});
