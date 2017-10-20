'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('students', {

    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{

        }
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    image: {
        type: Sequelize.STRING,
        allowNull: true
    }
})




