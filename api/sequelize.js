// require('dotenv').config({});
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sample.db',
    define: {
      timestamps: false
    }
  })

sequelize.sync({}).then(() => {
  console.log("good");
})

module.exports = sequelize;