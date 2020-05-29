var express = require('express');
var router = express.Router();
const pool = require("../config.js")


router.get("/trivia_terror_troll", (req, res) => {
  pool
    .query("SELECT * FROM trivia_terror_troll")
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});

module.exports = router;