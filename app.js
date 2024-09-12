const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const compression = require("compression");
const http = require("http");
const socketIo = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());
app.use(compression());

let base = [];

// Serve initial data
app.get("/", (req, res) => {
  res.json(base);
});

// Handle data update
app.post("/", (req, res) => {
  base.push(req.body);
  io.emit("update", base); // Emit an update event to all connected clients
  res.json(base);
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  console.log("A client connected");

  // Send initial data to the newly connected client
  socket.emit("update", base);

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;
