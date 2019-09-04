const router = require("express").Router();

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

function validatePostId(req, res, next) {}

module.exports = router;
