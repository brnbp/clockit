const moment = require('moment');
const records = require('../../src/db/records');
const msgs = require('./messages');
const { transform } = require('./transformer');
const time = require('./time');
const draw = require('./draw');

const WORK_PERIOD_IN_MINUTES = process.env.WORK_HOURS_PER_DAY * 60;
const canGoHomeAt = workPeriodMinutes => console.log(`you can go home at: ${moment().add(workPeriodMinutes, 'minutes').format('HH:mm')}`);

const first = (date) => {
  date = date || time.currentDate();
  records.first({ date }, (record) => {
    if (!record) return console.log(msgs.clock.noRecordsFound);
    draw(transform(record));
  });
}

const print = (date, message) => {
  console.log(message);
  console.log('------------------------------------');
  first(date);
};

const errNotClokedYet = (date) => print(date, msgs.clock.errNotClokedYet);

const start = (date, time) => {
  const record = {
    date,
    start_day: time,
  };
  records.insert(
    record,
    () => {
      print(date, msgs.clock.in.success);
      canGoHomeAt(WORK_PERIOD_IN_MINUTES);
    },
    () => print(date, msgs.clock.in.error),
  );
};

const lunchIn = (date, startLunch) => {
  records.first(
    { date },
    (record) => {
      if (record[0].start_lunch) {
        return print(date, msgs.clock.lunch.in.error);
      }
      records.update(
        { start_lunch: startLunch },
        { date },
        () => print(date, msgs.clock.lunch.in.success),
      );
    },
    () => errNotClokedYet(date),
  );
};

const lunchOut = (date, endLunch) =>
  records.first({ date },
    (record) => {
      [record] = record;
      if (record.end_lunch) {
        return print(date, msgs.clock.lunch.out.error);
      }
      if (!record.start_lunch) {
        return print(date, msgs.clock.lunch.out.rule);
      }

      const totalWorkBeforeLunch = time.getDiffPeriod(record.start_day, record.start_lunch);
      canGoHomeAt(WORK_PERIOD_IN_MINUTES - totalWorkBeforeLunch);

      records.update({ end_lunch: endLunch }, { date }, () => print(date, msgs.clock.lunch.out.success));
    },
    () => errNotClokedYet(date),
  );

const end = (date, endDay) =>
  records.first({ date },
    (record) => {
      [record] = record;
      if (record.end_day !== null) {
        return print(date, msgs.clock.out.error);
      }

      if (record.start_lunch && !record.end_lunch) {
        return print(date, msgs.clock.out.rule);
      }

      record.end_day = endDay;

      const data = {
        end_day: endDay,
        total_time: time.getTotalWork(record),
      };

      records.update(data, { date }, () => print(date, msgs.clock.out.success));
    },
    () => errNotClokedYet(date),
  );

const status = () => records.retrieve((records) => {
  if (!records) return console.log(msgs.clock.noRecordsFound);
  return draw(transform(records));
});

const clearToday = () => {
  const date = time.currentDate();
  records.remove({ date }, () => console.log('All records for today are clear now'), () => {});
};

module.exports = {
  start,
  lunchIn,
  lunchOut,
  end,
  status,
  clearToday,
};
