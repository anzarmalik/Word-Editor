var sequelize = require('sequelize');

var Sequelize = new sequelize('testing', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000

    }
}

)


Sequelize.sync({ force: false })

module.exports = Sequelize ;