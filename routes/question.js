var express = require('express');
var router = express.Router();
//var app = require('../app');
const pool = require("../config.js")


router.get("/question", (req, res) => {
  pool
    .query("SELECT * FROM question")
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});

router.post("/question", (req, res) => {
  const { text, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3, id_difficulty, id_category, id_creator } = req.body; 

  pool
    .query('INSERT INTO question (text, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3, id_difficulty, id_category, id_creator) values($1, $2, $3, $4, $5, $6, $7, $8)RETURNING *;',
    [text, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3, id_difficulty, id_category, id_creator])
    .then(data => res.status(201).json(data))
    .catch(e =>{ res.sendStatus(404)
    console.log(e)
    });
 });

/*router.get("/question", (req, res) => {
  pool
    .query("SELECT * FROM question JOIN difficulty ON (difficulty.id=question.id) WHERE name = 'hard'")
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});*/

/*router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query('SELECT * FROM question WHERE id=$1;', [id])
    .then(data => res.json(data)) 
    .catch(e => res.sendStatus(404)); 
 });*/
 
module.exports = router;
