var sequelize = require('sequelize')
var Sequelize = require('../config/db');


var User = Sequelize.define('documentEditor', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: sequelize.STRING,
        defaultValue: null
    },
    imageUrl: {
        type: sequelize.STRING,
        defaultValue: null
    },
    bodyContent: {
        type: sequelize.TEXT,
        defaultValue: null
    },
    htmlBodyContent: {
        type: sequelize.TEXT,
        defaultValue: null
    },
    subjectContent: {
        type: sequelize.TEXT,
        defaultValue: null
    },
    htmlSubjectContent: {
        type: sequelize.TEXT,
        defaultValue: null
    },

})

module.exports = User;