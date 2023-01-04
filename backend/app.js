require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const csurf = require("csurf");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { ValidationError } = require("sequelize");
const { environment } = require("./config");
const isProduction = environment === "production";
const mongoose = require("mongoose");

const User = require("./models/Users");

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(routes);

if (!isProduction) {
  app.use(cors());
}

app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);

// app.use(
//   csurf({
//     cookie: {
//       secure: isProduction,
//       sameSite: isProduction && "Lax",
//       httpOnly: true,
//     },
//   })
// );

// app.use(routes);

mongoose.connect(
  "mongodb://localhost:27017",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) console.log("database connected");
    else console.log("error with database");
  }
);
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  console.log(password);

  // const savedUser = await user.save();
  res.send("cool");
});
module.exports = app;
