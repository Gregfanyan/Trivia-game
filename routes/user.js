var express = require('express');
var router = express.Router();
const pool = require("../config.js")


router.get("/user", (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});


router.post("/user", (req, res) => {
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
 


 
module.exports = router;