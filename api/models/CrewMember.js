const sequelize = require('../sequelize');
const { DataTypes } = require('sequelize');

const CrewMember = sequelize.define('crewmember', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate :{
            len: [5,200]
        }
    },
    role: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['DIRECTOR', 'WRITER', 'PRODUCER']
    }
});

module.exports = CrewMember;