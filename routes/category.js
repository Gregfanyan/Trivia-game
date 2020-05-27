var express = require('express');
var router = express.Router();
const pool = require("../config.js")


router.get("/category/category", (req, res) => {
  pool
    .query('SELECT * FROM category')
    .then((data) => res.json(data))
    .catch((e) => {
      res.sendStatus(404), console.log(e);
    });
});


router.get("/category/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query('SELECT * FROM category WHERE id=$1;', [id])
    .then(data => res.json(data)) 
    .catch(e => res.sendStatus(404)); 
 });




module.exports = router;
