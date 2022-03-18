const dbConfig = require( '../config/db.config' );

const Sequelize = require('sequelize');

const sequelize = new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:    dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

let toturialsModel = require( './tutorials.model.js' );
let userssModel    = require( './users.model.js' );

db.users     = userssModel( sequelize, Sequelize );
db.tutorials = toturialsModel( sequelize, Sequelize );

module.exports = db;