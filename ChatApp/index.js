const express = require("express");
const ejs = require("ejs");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
app.set("view engine", "ejs");
app.get("/home", (req, res) => {
  res.render("home");
});
server.listen(3001, () => {
  console.log("Server Running....");
});
io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
  socket.on("message", (data) => {
    socket.broadcast.emit("message", { message: data, socket_id: socket.id });
    socket.emit("message", { message: data, socket_id: socket.id });
  });
});
