const { db } = require('./db');

const TABLE_NAME = 'records';

const createTable = () =>
  db
    .schema
    .createTableIfNotExists(TABLE_NAME, (table) => {
      table.increments('id');
      table.date('date');
      table.time('start_day');
      table.time('start_lunch');
      table.time('end_lunch');
      table.time('end_day');
      table.time('total_time');
      table.unique('date');
      table.index('date');
    })
    .catch(e => console.log(`Errors in createTable ${e}`));

const setup = callback =>
  db.schema.hasTable(TABLE_NAME).then((exists) => {
    if (!exists) {
      createTable();
    }
    callback(exists);
  });

const insert = (data, success, err) =>
  db.table(TABLE_NAME)
    .insert(data)
    .then(success)
    .catch(err);

const first = (filter, success, err) =>
  db.table(TABLE_NAME)
    .limit(1)
    .where(filter)
    .then(success)
    .catch(err);

const retrieve = (success, err) =>
  db.table(TABLE_NAME)
    .select()
    .orderBy('date', 'DESC')
    .limit(5)
    .then(success)
    .catch(err);

const update = (data, filter, success) =>
  db.table(TABLE_NAME)
    .update(data)
    .where(filter)
    .then(success);

const remove = (filter, success, err) =>
  db.table(TABLE_NAME)
    .delete()
    .where(filter)
    .then(success)
    .catch(err);

module.exports = {
  setup,
  insert,
  first,
  update,
  retrieve,
  remove,
};
