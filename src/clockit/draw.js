const CliTable = require('cli-table2');
const chalk = require('chalk');
const msgs = require('../lang/' + process.env.LANGUAGE);

const table = new CliTable({
  head: [
    chalk.yellow(msgs.table.date),
    chalk.yellow(msgs.table.in),
    chalk.yellow(msgs.table.lin),
    chalk.yellow(msgs.table.lout),
    chalk.yellow(msgs.table.out),
    chalk.yellow(msgs.table.total),
  ],
  style: {
    head: [],
    border: [],
  },
  colWidths: [13, 12, 12, 12, 12, 12],
});

module.exports = (days) => {
  days.map(day => table.push([
    chalk.blue(day.date),
    chalk.blue(day.start_day),
    chalk.blue(day.start_lunch),
    chalk.blue(day.end_lunch),
    chalk.blue(day.end_day),
    chalk.blue(day.total_time),
  ]));

  console.log(table.toString());
};
