const moment = require('moment');
const records = require('../../src/db/records');
const msgs = require('./messages');
const { transform } = require('./transformer');
const time = require('./time');
const draw = require('./draw');

const first = () => records.first({ date: currentDate() }, record => {
  if (!record) return console.log(msgs.clock.noRecordsFound)
  draw(transform(record));
});

const print = (message) => {
  console.log(message);
  console.log('------------------------------------');
  first();
}

const WORK_PERIOD_IN_MINUTES = process.env.WORK_HOURS_PER_DAY * 60;
const canGoHomeAt = (workPeriodMinutes) => console.log(`you can go home at: ${moment().add(workPeriodMinutes, 'minutes').format('HH:mm')}`);
const errNotClokedYet = () => print(msgs.clock.errNotClokedYet);
const currentDate = () => moment().format('Y-M-DD');
const currentHour = () => moment().format('HH:mm');

const start = () => {
  const record = {
    date: currentDate(),
    start_day: currentHour()
  };
  records.insert(
    record,
    () => {
      print(msgs.clock.in.success); 
      canGoHomeAt(WORK_PERIOD_IN_MINUTES);
    },
    () => print(msgs.clock.in.error)
  );
};

const lunchIn = () => {
  const date = currentDate();
  const startLunch = currentHour();

  records.first(
    { date },
    record => {
      record = record[0];
      if (record.start_lunch) {
        return print(msgs.clock.lunch.in.error);
      }
      records.update({ start_lunch: startLunch }, { date }, () => print(msgs.clock.lunch.in.success))
    },
    errNotClokedYet
  )
};

const lunchOut = () => {
  const date = currentDate();
  const endLunch = currentHour();

  records.first({ date },
    record => {
      record = record[0];
      if (record.end_lunch) {
        return print(msgs.clock.lunch.out.error);
      }
      if (!record.start_lunch) {
        return print(msgs.clock.lunch.out.rule);
      }

      const totalWorkBeforeLunch = time.getDiffPeriod(record.start_day, record.start_lunch);
      canGoHomeAt(WORK_PERIOD_IN_MINUTES - totalWorkBeforeLunch);

      records.update({ end_lunch: endLunch }, { date }, () => print(msgs.clock.lunch.out.success));
    },
    errNotClokedYet
  );
};

const end = () => {
  const date = currentDate();
  const endDay = currentHour();

  records.first({ date }, 
    record => {
      record = record[0];
      if (record.end_day !== null) {
        return print(msgs.clock.out.error);
      }

      if (record.start_lunch && !record.end_lunch) {
        return print(msgs.clock.out.rule);
      }

      record.end_day = endDay;

      const data = {
        end_day: endDay,
        total_time: time.getTotalWork(record)
      };

      records.update(data, { date }, () => print(msgs.clock.out.success));
    },
    errNotClokedYet
  );
};

const status = () => records.retrieve(records => {
  if (!records) return console.log(msgs.clock.noRecordsFound)
  draw(transform(records));
});

const clearToday = () => {
  const date = currentDate();
  records.remove({ date }, () => console.log('All records for today are clear now'), () => {});
}

module.exports = {
  start,
  lunchIn,
  lunchOut,
  end,
  status,
  clearToday
}
