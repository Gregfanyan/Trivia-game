var express = require('express');
var router = express.Router();
const pool = require("../config.js");
var cors = require('cors');



router.get("/game", cors(), (req, res) => {
  pool
    .query("SELECT * FROM game")
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});



router.post("/game", (req, res) => {
  const { name } = req.body; 

  pool
    .query('INSERT INTO game(name) values($1);', [name])
    .then(data => res.status(201).json(data))
    .catch(e => res.sendStatus(404));
 });


module.exports = router;
