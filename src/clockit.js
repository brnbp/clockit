const moment = require('moment');
const records = require('../src/db/records');
const msgs = require('./messages');
const transformer = require('./transformer');

const first = () => records.first({ date: currentDate() }, record => {
  if (!record) return console.log(msgs.clock.noRecordsFound)
  console.log(transformer(record))
});

const print = (message) => {
  console.log(message);
  console.log('------------------------------------');
  first()
}
  
const errNotClokedYet = () => print(msgs.clock.errNotClokedYet);
const currentDate = () => moment().format('Y-M-DD');
const currentHour = () => moment().format('HH:mm')

const start = () => {
  const record = {
    date: currentDate(),
    start_day: currentHour()
  };

  records.insert(
    record,
    () => print(msgs.clock.in.success),
    () => print(msgs.clock.in.error)
  );
};

const lunchIn = () => {
  const date = currentDate();
  const startLunch = currentHour();

  records.first(
    { date },
    record => {
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
      if (record.end_lunch) {
        return print(msgs.clock.lunch.out.error);
      }
      if (!record.start_lunch) {
        return print(msgs.clock.lunch.out.rule);
      }
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
      if (record.end_day !== null) {
        return print(msgs.clock.out.error);
      }
      records.update({ end_day: endDay }, { date }, () => print(msgs.clock.out.success));
    },
    errNotClokedYet
  );
};

const status = first

module.exports = {
  start,
  lunchIn,
  lunchOut,
  end,
  status,
}