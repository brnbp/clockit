const { expect } = require('chai');
const { transform, format } = require('../../../src/clockit/transformer')

describe('Transfomer: transform', () => {
  it('should transform a list with one record with full hours', () => {
    const rawData = [
      {
        date: '2017-12-05',
        start_day: '09:00',
        start_lunch: '12:00',
        end_lunch: '13:00',
        end_day: '18:00',
        total_time: '08:00',
      }
    ];

    const expectedOutput = [
      {
        date: '05/12/2017',
        start_day: '09:00',
        start_lunch: '12:00',
        end_lunch: '13:00',
        end_day: '18:00',
        total_time: '08:00',
      }
    ];

    expect(transform(rawData)).to.be.eql(expectedOutput)
  });
  it('should transform a list wit one record with some hours null', () => {
    const rawData = [
      {
        date: '2017-12-05',
        start_day: '09:00',
        start_lunch: null,
        end_lunch: '13:00',
        end_day: null,
        total_time: '08:00',
      }
    ];

    const expectedOutput = [
      {
        date: '05/12/2017',
        start_day: '09:00',
        start_lunch: '--:--',
        end_lunch: '13:00',
        end_day: '--:--',
        total_time: '08:00',
      }
    ];

    expect(transform(rawData)).to.be.eql(expectedOutput)
  });
  it('should transform a list wit one record with all hours null', () => {
    const rawData = [
      {
        date: '2017-12-05',
        start_day: null,
        start_lunch: null,
        end_lunch: null,
        end_day: null,
        total_time: null,
      }
    ];

    const expectedOutput = [
      {
        date: '05/12/2017',
        start_day: '--:--',
        start_lunch: '--:--',
        end_lunch: '--:--',
        end_day: '--:--',
        total_time: '--:--',
      }
    ];

    expect(transform(rawData)).to.be.eql(expectedOutput)
  });
});

describe('Transfomer: format', () => {
  it('should transform date', () => {
    const rawDate = '2017-12-05';

    const expectedOutput = '05/12/2017';

    expect(format(rawDate)).to.be.eql(expectedOutput)
  });
});
