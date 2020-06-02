var express = require("express");
var router = express.Router();
const pool = require("../config.js");

router.get("/category", (req, res) => {
  pool
    .query("SELECT * FROM category")
    .then((data) => res.json(data))
    .catch((e) => {
      console.log(e);
      res.sendStatus(404);
    });
});

router.get("/category/:name", (req, res) => {
  const { name } = req.params;
  pool
    .query("SELECT * FROM category WHERE name=$1;", [name])
    .then((data) => res.json(data))
    .catch((e) => res.sendStatus(404));
});


/*const category = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM category WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
} */

module.exports = router;
