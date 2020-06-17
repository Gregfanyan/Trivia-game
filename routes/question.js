var express = require('express');
var router = express.Router();
const pool = require("../config.js")


/* start
DEBUG=TRIVIA-TERROR-BACKEND:* npm start
DEBUG=TRIVIA-TERROR-BACKEND:* npm run devstart
sudo pkill -u postgres
lsof -i tcp:3000 kill -9 pid
*/

router.get("/question", (req, res) => {
  pool
    .query("SELECT * FROM question LIMIT 10")
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});

router.post("/question", (req, res) => {
  const { text, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3, id_difficulty, id_category, id_submitter } = req.body; 

  pool
    .query('INSERT INTO question (text, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3, id_difficulty, id_category, id_submitter) values($1, $2, $3, $4, $5, $6, $7, $8)RETURNING *;',
    [text, correct_answer, incorrect_answer1, incorrect_answer2, incorrect_answer3, id_difficulty, id_category, id_submitter])
    .then(() => {pool.query('SELECT * FROM question')
    .then(data => res.status(201).json(data))})
    .catch(e =>{ res.sendStatus(404)
    console.log(e)
    });
 });

 router.get("/:category/:difficulty/:number", (req, res) => {
  const { category, difficulty, number } = req.params;
  pool 
    .query('SELECT category.name, difficulty.name, text FROM question JOIN difficulty ON (difficulty.id=question.id) JOIN category ON (question.id = category.id) WHERE category.name = $1 AND difficulty.name = $2 LIMIT $3', [category, difficulty, number])
    .then(data => res.json(data)) 
    .catch(e => {res.sendStatus(404)
    console.log(e)
    });  
 });
 

router.get("/question/:name", (req, res) => {
  const { name } = req.params;
  pool 
    .query('SELECT * FROM question JOIN difficulty ON (difficulty.id=question.id) WHERE name = $1', [name])
    .then(data => res.json(data)) 
    .catch(e => res.sendStatus(404)); 
 });

 router.get("/question/category/:name", (req, res) => {
  const { name } = req.params;
  pool
    .query('SELECT * FROM question JOIN category ON (category.id=question.id) WHERE name = $1;', [name])
    .then(data => res.json(data)) 
    .catch(e => res.sendStatus(404)); 
 });


 /*router.get("/random/:difficulty", (req, res) => {
  const { difficulty } = req.params;
  console.log(difficulty)

  pool
    .query('SELECT * FROM question WHERE id_difficulty = $1 ORDER BY RANDOM() LIMIT 1; ', [difficulty])
    .then(data => {
      res.json(data)
    }) 
    .catch(e => res.sendStatus(404)); 
     //console.log(e);
 });*/

 router.get("/random", (req, res) => {
  pool
    .query('SELECT * FROM question OFFSET RANDOM() * (SELECT COUNT(id) FROM question) LIMIT 1; ')
    .then(data => res.json(data)) 
    .catch(e => res.sendStatus(404)); 
 });


 router.get("/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query('SELECT * FROM question WHERE id=$1;', [id])
    .then(data => res.json(data)) 
    .catch(e => res.sendStatus(404)); 
 });

 router.get("/dashboard/:id_submitter", (req, res) => {
  const { id_submitter } = req.params;

  pool
    .query('SELECT  COUNT(no_of_displays),COUNT(no_of_correct_answers), COUNT(id_submitter), COUNT(question_status.status) FROM question FULL JOIN question_status ON (question_status.id = question.status) JOIN users ON (id_submitter = users.id) WHERE id_submitter = $1 GROUP BY users.id LIMIT 1;', [id_submitter])
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});

router.get("/submitter/:id_submitter", (req, res) => {
  const { id_submitter } = req.params;
  pool
    .query("SELECT * FROM question WHERE id_submitter = $1;", [id_submitter])
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});
 
module.exports = router;