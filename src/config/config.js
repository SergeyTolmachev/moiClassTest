require('dotenv').config();

module.exports = {
  port: process.env.APPLICATION_PORT,
  postgres: {
    login: process.env.POSTGRES_LOGIN,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
  },
};
