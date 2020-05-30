var express = require('express');
var router = express.Router();
const pool = require("../config.js")


router.get("/user", (req, res) => {
  pool
    .query("SELECT * FROM question LIMIT 10")
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});

router.post("/question", (req, res) => {
  const {username, email, password, avatarurl} = req.body; 

  pool
    .query('INSERT INTO user (username, email, password, avatarurl) values($1, $2, $3, $4)RETURNING *;',
    [text, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3, id_difficulty, id_category, id_creator])
    .then(() => {pool.query('SELECT * FROM question')
    .then(data => res.status(201).json(data))})
    .catch(e =>{ res.sendStatus(404)
    console.log(e)
    });
 });


 


 
module.exports = router;