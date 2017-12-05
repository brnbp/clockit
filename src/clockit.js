const moment = require('moment');
const records = require('../src/db/records');

const print = (message) => {
  console.log(message);
  console.log('------------------------------------');
  records.first({ date: currentDate() }, record => console.log(record || 'No records found! 📭'));
}
  
const errNotClokedYet = () => print('you might have not clockin for work yet 🤔');

const currentDate = () => moment().format('Y-M-DD');
const currentHour = () => moment().format('HH:mm')

const start = () => {
  const record = {
    date: currentDate(),
    start_day: currentHour()
  };

  records.insert(
    record,
    () => print('check in at morning done 👩‍💻'),
    () => print('check in at morning already done')
  );
};

const lunchIn = () => {
  const date = currentDate();
  const startLunch = currentHour();

  records.first(
    { date },
    record => {
      if (record.start_lunch) {
        return print('check in for lunch already done');
      }
      records.update({ start_lunch: startLunch }, { date }, () => print('check in for lunch done 🍝'))
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
        return print('check out for lunch already done');
      }
      if (!record.start_lunch) {
        return print('you should clockin for lunch before clockout');
      }
      records.update({ end_lunch: endLunch }, { date }, () => print('check out for lunch done 🍽'));
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
        return print('check out already done');
      }
      records.update({ end_day: endDay }, { date }, () => print('check out done 👋😎'));
    },
    errNotClokedYet
  );
};

const status = () => {
  records.first({ date: currentDate() }, record => console.log(record || 'No records found! 📭'))
}

module.exports = {
  start,
  lunchIn,
  lunchOut,
  end,
  status,
}