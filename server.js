const express = require("express");

const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

const server = express();

//global middleware
server.use(express.json());

server.use("/posts", postRouter);
server.use("/users", userRouter);
server.use(logger);

server.get("/", (req, res) => {
  // res.send(`<h2>Let's write some middleware!</h2>`);
  res.status(200).json({ api: "up and running" });
});

//custom middleware

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}]`);

  next();
}

module.exports = server;
