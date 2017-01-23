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
    allowNull: false,
    //isURL: true,
  },

  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    notEmpty: true
  },

  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
}, {
  getterMethods   : {
    route       : function()  { return '/wiki/' + this.urlTitle }
  }
}, {
  hooks: {
    beforeValidate: function(){
      if(this.title.length === 0){
    var randomLength = Math.ceil(Math.random()*50);
    this.urlTitle = createTitle(randomLength);

    function createTitle(length){
      var text = "";
      var possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
      for(var i = 0; i < length; i++){
        text += possibleChars.charAt(Math.floor(Math.random()*possibleChars.length));
      }
      return text;
    }
  }

  else{
    this.urlTitle = this.title.replace(" ", "_");
  }
  }
  }
}
);



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


