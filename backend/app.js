require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
// const routes = require("./routes");
const { ValidationError } = require("sequelize");
const { environment } = require("./config");
const isProduction = environment === "production";
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

// app.use(routes);

mongoose.connect(
  "mongodb://localhost:27017",
  { userNewUrlParser: true },
  (err) => {
    if (!err) console.log("database connected");
    else console.log("error wu=ith database");
  }
);
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
