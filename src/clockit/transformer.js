const moment = require('moment');

const format = date => moment(date).format('DD/MM/YYYY');

const transform = data =>
  data.map(day => ({
    date: format(day.date),
    start_day: day.start_day || '--:--',
    start_lunch: day.start_lunch || '--:--',
    end_lunch: day.end_lunch || '--:--',
    end_day: day.end_day || '--:--',
    total_time: day.total_time || '--:--'
  }));

module.exports = {
  transform,
  format,
};
