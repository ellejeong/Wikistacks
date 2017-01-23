const Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },

  urlTitle: {
    type: Sequelize.STRING,
  },

  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },

  status: {
    type: Sequelize.ENUM,
    values: ['open', 'closed']
  }
}, {
  getterMethods   : {
    route       : function()  { return '/wiki/' + this.urlTitle }
  },
  hooks: {
    beforeValidate: function generateUrlTitle (page) {
      console.log("TITLE-----", page.title);
      if (page.title) {
        // Removes all non-alphanumeric characters from title
        // And make whitespace underscore
        this.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        // Generates random 5 letter string
        this.urlTitle = Math.random().toString(36).substring(2, 7);
      }
    }
  }
});



var User = db.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true
  }
});


module.exports = {
  Page: Page,
  User: User
};


