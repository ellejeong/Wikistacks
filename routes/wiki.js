const express = require('express');
const router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;


router.get("/", function(req, res, next){
  res.send("First GET worked!");
});

router.post("/", function(req, res, next){
  Page.create({
    title: req.body.title,
    content: req.body.PageContent
  })
  .then(function(){
    res.json(req.body)
  })
  .catch(console.error);
});

router.get("/add", function(req, res, next){
  res.render('./../views/addpage');
});

router.get("/:urlTitle", function(req, res, next){
  console.log(req.params.urlTitle, "<--- urlTitle");
  //res.send('hit dynamic route at ' + req.params.urlTitle);
    Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.json(foundPage);
  })
  .catch(next);
});


