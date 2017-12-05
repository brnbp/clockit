const yargs = require('yargs');
const moment = require('moment');

const knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: './db/database.db'
  },
  useNullAsDefault: true
})

const createTable = knex =>
  knex.schema
    .createTableIfNotExists('records', table => {
      table.increments('id')
      table.date('date')
      table.time('start_day')
      table.time('start_lunch')
      table.time('end_lunch')
      table.time('end_day')
      table.unique('date')
      table.index('date')
    })
    .catch(e => console.log(`Errors in createTable ${e}`))


const printSuccess = (message) => {
  console.log(message)
  console.log('------------------------------------')
  const date = moment().format('Y-M-DD');
  knex.table('records').first('*').where({ date }).then(row => console.log(row))
}

yargs
  .command('init', 'start service', () => {
    knex.schema.hasTable('records').then(started => {
      if (!started) {
        createTable(knex);
        console.log('service started')
        return;
      }
      console.log('service already started')
    })
  })
  .command('in', 'check in at morning', () => {
    
    const date = moment().format('Y-M-DD');
    const start_day = moment().format('H:mm');

    knex.table('records')
        .insert({ date, start_day })
        .then(success => printSuccess('check in at morning done'))
        .catch(e => printSuccess('check in at morning already done'))
  })
  .command('lin', 'check in lunch', () => {
    const date = moment().format('Y-M-DD');
    const start_lunch = moment().format('H:mm');

    knex.table('records').first('start_lunch').where({ date })
      .then(record => {
        if (record.start_lunch) {
          return printSuccess('check in for lunch already done');
        }
        knex.table('records').update({ start_lunch }).where({ date })
          .then(success => printSuccess('check in for lunch done'))
      })
  })
  .command('lout', 'check out lunch', () => {
    const date = moment().format('Y-M-DD');
    const end_lunch = moment().format('H:mm');

    knex.table('records').first('end_lunch').where({ date }).then(record => {
      if (record.end_lunch) {
        return printSuccess('check out for lunch already done');
      }
      knex.table('records').update({ end_lunch }).where({ date })
        .then(success => printSuccess('check out for lunch done'))
    })
  })
  .command('out', 'check out at afternoon', () => {
    const date = moment().format('Y-M-DD');
    const end_day = moment().format('H:mm');

    knex.table('records').first('end_day').where({ date }).then(record => {
      if (record.end_day !== null) {
        return printSuccess('check out already done');
      }
      
      knex.table('records').update({ end_day }).where({ date })
        .then(success => printSuccess('check out done'))
    })
  })
  .command('status', 'status for day', () => {
    const date = moment().format('Y-M-DD');
    knex.table('records').first('*').where({ date }).then(row => console.log(row))
  })
  .argv
