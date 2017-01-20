const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

const User = db.define('user', {
  //table schema of attributes
  name: Sequelize.STRING,
  pictureURL: Sequelize.STRING
}, {
  //methods -- class, instance, hooks
});

User.sync({force: true}) // <--sync is a Promise
  .then(() => {
    const person = User.build({
      name: "Raina",
      pictureURL: "http://fillmurrary.com/100/100"
    })
    return Promise.all([
      person.save();
      User.create({
        name: "Meredith",
        pictureURL: "http://fillmurray.com/101/101"
      })
  ])
})
  .then((arrayOfCreatedPeoples) => {
    return User.findAll({where: {name: 'Raina'}})
    })
  .then(allUsers) => {
    console.log("All Users", allUsers);
  }
  });

  //anything talking to the database is asynchronous
