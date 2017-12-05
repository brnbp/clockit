const knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: './db/database.db',
  },
  useNullAsDefault: true,
});

module.exports = {
    db: knex
};