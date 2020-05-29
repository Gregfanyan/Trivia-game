var express = require('express');
var router = express.Router();
const pool = require("../config.js")


router.get("/difficulty", (req, res) => {
  pool
    .query("SELECT * FROM difficulty")
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});

module.exports = router;
