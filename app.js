const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const compression = require("compression");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(compression());

let base = [];

app.get("/", (req, res) => {
  res.json(base);
});

app.post("/", (req, res) => {
  base.push(req.body);
  res.json(base);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
