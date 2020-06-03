var express = require('express');
var router = express.Router();
const pool = require("../config.js");
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;



/*
DEBUG=TRIVIA-TERROR-BACKEND:* npm run devstart
*/

router.get("/user", (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});


router.post("/register", (req, res) => {
  const {username, email, password, avatarurl} = req.body; 
  bcrypt.hash(password, saltRounds, function(err, hash) {
  pool
    .query('INSERT INTO users (username, email, password, avatarurl) values($1, $2, $3, $4)RETURNING *;',
    [username, email, hash, avatarurl])
    .then(() => {pool.query('SELECT * FROM users')
    .then(data => {res.status(201).json(data)
    })})
    .catch(e =>{ res.sendStatus(404)
    console.log(e)
    });
  });
 });
 
 router.post("/login", (req, res) => {
  const {email, password } = req.body; 
  pool
    .query("SELECT * FROM users WHERE email = $1 AND password = $2 LIMIT 1", [email, password ])
    if ( email && password === req.body.password) {
      const token = jwt.sign({ email: req.body.email }, "mySecretKey", {
        expiresIn: "30 day",
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