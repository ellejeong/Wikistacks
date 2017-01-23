const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const routes = require('./routes/index');
const db = require('./models/index');

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// app.listen(1337, function(){
//   console.log("Listening on port 1337");
// })

app.use("/", routes);

db.User.sync({})
  .then(function(){
    return db.Page.sync({});
  })
  .then(function(){
    app.listen(3000, function(){
      console.log("Server is listening on port 3001!");
    })
  })
  .catch(console.error);
