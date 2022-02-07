const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const Movie = sequelize.define('movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate :{
            len: [3,200]
        }
    },
    category: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['Comedy', 'Action', 'Drama']
    },
    publicationDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
  },
});

module.exports = Movie;