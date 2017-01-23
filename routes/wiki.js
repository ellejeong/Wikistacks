const express = require('express');
const router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

module.exports = router;

router.use(express.static('public'));

// router.get("/", function(req, res, next){
//   res.send("Homepage note");
// });

router.get("/", function(req, res, next){
  res.send("First GET worked!");
});

router.post("/", function(req, res, next){
  var page = Page.build({
    title: req.body.title,
    content: req.body["Page Content"]
  });

  // if(page.title.length === 0){
  //   var randomLength = Math.random()*50;
  //   page.urlTitle = createTitle(randomLength);

  //   function createTitle(length){
  //     var text = "";
  //     var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
  //     for(var i = 0; i < length; i++){
  //       text += possibleChars.charAt(Math.floor(Math.random()*possibleChars.length));
  //     }
  //     return text;
  //   }
  // }

  // else{
  //   page.urlTitle = page.title.replace(" ", "_");
  // }

  page.save();
  //next();
  //res.redirect('/');

res.json(req.body);
});

router.get("/add", function(req, res, next){
  res.render('./../views/addpage');

});


