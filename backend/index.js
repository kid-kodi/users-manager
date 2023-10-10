const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 5000;

const errorHandler = require("./helpers/error");

const auth = require("./routes/auth");
const users = require("./routes/users");

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);
app.use("/", express.static(__dirname + "/assets"));

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/base");
}

const corsOptions = {
  credentials: true,
  origin: "*",
};
app.use(cors(corsOptions));

//use middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api/auth", auth);
app.use("/api/users", users);

// global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
