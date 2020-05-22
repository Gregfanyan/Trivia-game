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

module.exports = router;
