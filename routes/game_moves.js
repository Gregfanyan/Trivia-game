var express = require('express');
var router = express.Router();
const pool = require("../config.js")


router.get("/game_moves/game_moves", (req, res) => {
  pool
    .query("SELECT * FROM game_moves")
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});

module.exports = router;