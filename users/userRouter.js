const router = require("express").Router();
const express = require("express");
const server = express();
const db = require("./userDb");
const dbPost = require("../posts/postDb");
server.use(express.json());
server.use(validateUserId);
server.use(validateUser);
server.use(validatePost);

router.post("/", validateUser, (req, res) => {
  const userData = req.body;
  db.insert(userData)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error saving the user to the database"
      });
    });
});
// working

router.post("/:id/posts", validatePost, (req, res) => {
  // adding comment to user post w/ specific ID
  const id = req.params.id;
  const body = req.body;
  db.getById(id).then(users => {
    dbPost
      .insert(body)
      .then(post => {
        res.status(201).json({ api: "post request working", post });
      })
      .catch(error => {
        res.status(500).json({
          error: "The post information could not be retrieved."
        });
      });
  });
});
// working

router.get("/", (req, res) => {
  // dont need the functions for get requests
  db.get()
    .then(posts => {
      res.status(200).json({ api: "getting users back", posts });
    })
    .catch(error => {
      res.send(500).json({
        error: "The posts information could not be retrieved."
      });
    });
});
// working

router.get("/:id", (req, res) => {
  //dont need function here for get req
  const id = req.params.id;
  if (id) {
    db.getById(id)
      .then(post => {
        res.status(200).json({ api: "getting user by ID", post });
      })
      .catch(error => {
        res.send(500).json({
          error: "The information could not be retrieved."
        });
      });
  }
});
// working

router.get("/:id/posts", (req, res) => {
  const id = req.params.id;
  if (id) {
    db.getUserPosts(id)
      .then(posts => {
        res.status(200).json({ api: "getting user posts by ID", posts });
      })
      .catch(error => {
        res.send(500).json({
          error: "The information could not be retrieved."
        });
      });
  }
});
// working

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(200).json({ api: "delete request working", deleted });
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.send(500).json({
        error: "The post could not be removed"
      });
    });
});
// working

router.put("/:id", validateUserId, (req, res) => {
  const id = req.params.id;
  const update = req.body;

  db.update(id, update)
    .then(updated => {
      res.status(200).json({ api: "update working", updated });
    })
    .catch(error => {
      res.send(500).json({
        error: "The user information could not be modified."
      });
    });
});
// working

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  db.getById(id).then(userid => {
    if (userid) {
      req.user = req.body;
    } else {
      res.status(400).json({
        message: "invalid user id"
      });
    }
  });
  next();
}

function validateUser(req, res, next) {
  console.log(req.body);
  if (Object.keys(req.body) < 1) {
    return res.status(400).json({ message: "missing user data" });
  }
  if (!req.body.name) {
    return res.status(400).json({ message: "missing required name field" });
  }
  req.user = req.body;
  next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  }
  next();
}

module.exports = router;
