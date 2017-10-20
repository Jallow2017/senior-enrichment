'use strict';
var Sequelize = require('sequelize');
var db = require('../index.js');


module.exports = db.define('campuses', {

    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

        }
    },

    image:{
        type: Sequelize.STRING,
        defaultValue: 'https://tctechcrunch2011.files.wordpress.com/2016/06/fullstack_academy_2015.jpg'
    },

    // location:{
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // },
    //
    // description:{
    //     type: Sequelize.STRING,
    //     allowNull: false,
    // }
});

