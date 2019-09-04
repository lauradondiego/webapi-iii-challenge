const router = require("express").Router();
const express = require("express");
const server = express();
const db = require("./postDb");
server.use(express.json());
server.use(validatePostId);

router.get("/", (req, res) => {
  res.send("get to /posts/");
});

router.get("/:id", (req, res) => {
  //   const id = req.body;
  res.send(`get to /posts/${id}`);
});

router.delete("/:id", (req, res) => {
  res.remove(`remove /posts/${id}`);
});

router.put("/:id", (req, res) => {
  res.update(`update /posts/${id}`);
});

// custom middleware

function validatePostId(req, res, next) {
  const id = req.body;
  db.getById(id).then(postid => {
    if (postid) {
      req.user = req.body;
    } else {
      res.status(400).json({
        message: "invalid post id"
      });
    }
  });
  next();
}

module.exports = router;
