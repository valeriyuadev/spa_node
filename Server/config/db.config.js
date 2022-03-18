module.exports = {
    HOST:     "localhost",
    //USER:     "postgres",
    USER:     "test",
    PASSWORD: "test",
    DB:       "node_express_postgres_sequelize_rest_api",
    dialect:  "postgres",
    pool: {
      max:     5,
      min:     0,      
      idle:    10000,
      acquire: 30000,
    }
};