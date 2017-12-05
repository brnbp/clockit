const moment = require('moment');

const format = date => moment(date).format('DD/MM/YYYY');

module.exports = data => ({
    date: format(data.date),
    start_day: data.start_day || '--:--',
    start_lunch: data.start_lunch || '--:--',
    end_lunch: data.end_lunch || '--:--',
    end_day: data.end_day || '--:--',
});