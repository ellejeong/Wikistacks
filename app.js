const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./routes/wiki');
const db = require('./models/index');

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use("/wiki", routes);

app.use('/users', function(req, res, next){
  res.redirect("/");
});

app.use("/", function(req, res, next){
  res.redirect("/wiki");
});

app.use("/", function(err, req, res, next){
  console.error(err);
});

db.User.sync({force: true})
  .then(function(){
    return db.Page.sync({force: true});
  })
  .then(function(){
    app.listen(3000, function(){
      console.log("Server is listening on port 3000!");
    })
  })
  .catch(console.error);

