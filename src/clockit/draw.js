const CliTable = require('cli-table2');
const chalk = require('chalk');

const table = new CliTable({
  head: [
    chalk.yellow('Date'),
    chalk.yellow('In'),
    chalk.yellow('Lunch In'),
    chalk.yellow('Lunch Out'),
    chalk.yellow('Out'),
    chalk.yellow('Total'),
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
