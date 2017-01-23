const Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING, allowNull: false, notEmpty: true
  },
  urlTitle: {
    type: Sequelize.STRING, allowNull: false, isURL: true
  },
  content: {
    type: Sequelize.TEXT, allowNull: false, notEmpty: true
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE, defaultValue: Sequelize.NOW
    }
});



var User = db.define("user", {
  name: {
    type: Sequelize.STRING, allowNull: false, notEmpty: true
  },
  email: {
    type: Sequelize.STRING, allowNull: false, isEmail: true
  }
});


module.exports = {
  Page: Page,
  User: User
};


