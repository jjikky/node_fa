const Sequelize = require("sequelize");

const dbConfig = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "0000",
  PORT: "5432",
  DB: "postgres",
  dialect: "postgres",
};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.PORT,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model")(sequelize, Sequelize);

module.exports = db;
