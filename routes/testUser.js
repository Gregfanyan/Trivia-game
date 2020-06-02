var express = require('express');
var router = express.Router();
const pool = require("../config.js");
var path = require("path");
var jwt = require('jsonwebtoken');

/*
DEBUG=TRIVIA-TERROR-BACKEND:* npm run devstart
*/

router.post("/register", (req, res) => {
  const {username, email, password, avatarurl} = req.body; 

  pool
    .query('INSERT INTO users (username, email, password, avatarurl) values($1, $2, $3, $4)RETURNING *;',
    [username, email, password, avatarurl])
    .then(() => {pool.query('SELECT * FROM users')
    .then(data => {res.status(201).json(data)
    console.log(data)
    })})
    .catch(e =>{ res.sendStatus(404)
    console.log(e)
    });
 });

router.post("/login", (req, res) => {
  const {username, password } = req.body; 
  pool
    .query("SELECT * FROM users WHERE username = $1 AND password = $2 LIMIT 1", [username, password ])
    if ( username && password === req.body.password) {
      const token = jwt.sign({ username: req.body.username }, "mySecretKey", {
        expiresIn: "1 day",
      });
      res.send(token);
    } else {
      res.sendStatus(401);
    }
});

const verifyAuth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const verification = jwt.verify(authorization, "mySecretKey");
    if (verification) next();
    else {
      res.sendStatus(401);
      console.log(verification);
      return;
}
  } catch (error) {
    res.sendStatus(401);
return;
  }
};


router.get("/admin", verifyAuth, (req, res, next) => {
  res.send("admin page");
});

 
module.exports = router;