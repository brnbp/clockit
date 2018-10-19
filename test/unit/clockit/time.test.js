const { expect } = require('chai');
const { getDiffPeriod, getTotalWork, formatTime, getHours, getMinutes } = require('../../../src/clockit/time');

describe('Time: getHours', () => {
  it('should get 5 hours from 5 hours and 20 minutes (320 minutes)', () => {
    const rawTime = 320;
    const expectedOutput = 5;
    expect(getHours(rawTime)).to.be.eql(expectedOutput)
  });
  it('should get 4 hours from 4 hours (240 minutes)', () => {
    const rawTime = 240;
    const expectedOutput = 4;
    expect(getHours(rawTime)).to.be.eql(expectedOutput)
  });
  it('should get 0 hours from 30 minutes', () => {
    const rawTime = 30;
    const expectedOutput = 0;
    expect(getHours(rawTime)).to.be.eql(expectedOutput)
  });
});

describe('Time: getMinutes', () => {
  it('should get 20 minutes from 5 hours and 20 minutes (320 minutes)', () => {
    const rawTime = 320;
    const expectedOutput = 20;
    expect(getMinutes(rawTime)).to.be.eql(expectedOutput)
  });
  it('should get 0 minutes from 5 hours (300 minutes)', () => {
    const rawTime = 300;
    const expectedOutput = 0;
    expect(getMinutes(rawTime)).to.be.eql(expectedOutput)
  });
  it('should get 0 minutes from 0 minutes', () => {
    const rawTime = 0;
    const expectedOutput = 0;
    expect(getMinutes(rawTime)).to.be.eql(expectedOutput)
  });
});

describe('Time: formatTime', () => {
  it('should format time: 5 = 05', () => {
    const rawTime = 5;
    const expectedOutput = '05';
    expect(formatTime(rawTime)).to.be.eql(expectedOutput)
  });
  it('should format time: 10 = 10', () => {
    const rawTime = 10;
    const expectedOutput = 10;
    expect(formatTime(rawTime)).to.be.eql(expectedOutput)
  });
});

describe('Time: getDiffPeriod', () => {
  it('should get positive difference between hours in minutes', () => {
    const startInput = '10:00';
    const endInput = '11:30';

    const expectedOutput = 90;

    expect(getDiffPeriod(startInput, endInput)).to.be.eql(expectedOutput)
  });
  it('should get negative difference between hours in minutes', () => {
    const startInput = '11:50';
    const endInput = '11:30';

    const expectedOutput = -20;

    expect(getDiffPeriod(startInput, endInput)).to.be.eql(expectedOutput)
  });
  it('should get 0 when no start is passed', () => {
    const endInput = '11:30';
    const expectedOutput = 0;

    expect(getDiffPeriod(null, endInput)).to.be.eql(expectedOutput)
    expect(getDiffPeriod(0, endInput)).to.be.eql(expectedOutput)
  });
});

describe('Time: getTotalWork', () => {
  it('should get total work hour with all records', () => {
    const rawInput = {
      start_day: '09:00',
      start_lunch: '12:00',
      end_lunch: '13:00',
      end_day: '18:00',
    }
    const expectedOutput = '08:00';
    expect(getTotalWork(rawInput)).to.be.eql(expectedOutput)
  });
  it('should get total work hour without lunch time', () => {
    const rawInput = {
      start_day: '09:30',
      start_lunch: null,
      end_lunch: null,
      end_day: '18:00',
    }
    const expectedOutput = '08:30';
    expect(getTotalWork(rawInput)).to.be.eql(expectedOutput)
  });
});