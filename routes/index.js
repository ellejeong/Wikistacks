const express = require('express');
const router = express.Router();

module.exports = router;

router.use(express.static('public'));

router.get("/", function(req, res){
  console.log("We received a GET request!");
  res.send("We received a GET request!");
})
