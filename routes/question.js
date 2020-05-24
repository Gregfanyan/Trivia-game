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
