describe("botService", function () {
  'use strict';

  var service;

  beforeEach(function () {
    angular.mock.module('bot');
  });

  beforeEach(inject(function (botService) {
    service = botService;
  }));

  it('returns an unviable object when the given time equals 0', function () {
    var date1 =  new Date(2014, 5, 11, 14, 14, 0, 0);
    var date2 =  new Date(0);

    var timeObject = service.getTimeDiff(date2, date1);
    expect(timeObject.viable).toBeFalsy();
  });

  it('returns an unviable object when the given time is higher than the current time', function () {
    var date1 =  new Date(2014, 5, 11, 14, 14, 0, 0);
    var date2 =  new Date(2014, 5, 12, 14, 14, 0, 0);

    var timeObject = service.getTimeDiff(date2, date1);
    expect(timeObject.viable).toBeFalsy();
  });

  it('sets the number of days between the two given dates', function () {
    var date1 =  new Date(2014, 5, 11, 14, 14, 0, 0);
    var date2 =  new Date(2014, 5, 10, 14, 14, 0, 0);

    var timeObject = service.getTimeDiff(date2, date1);
    expect(timeObject.viable).toBeTruthy();
    expect(timeObject.days).toBe(1);
  });

  it('sets the number of hours between the two given dates', function () {
    var date1 =  new Date(2014, 5, 11, 14, 14, 0, 0);
    var date2 =  new Date(2014, 5, 11, 12, 14, 0, 0);

    var timeObject = service.getTimeDiff(date2, date1);
    expect(timeObject.viable).toBeTruthy();
    expect(timeObject.hours).toBe(2);
  });

  it('sets the number of minutes between the two given dates', function () {
    var date1 =  new Date(2014, 5, 11, 14, 14, 0, 0);
    var date2 =  new Date(2014, 5, 11, 14, 1, 0, 0);

    var timeObject = service.getTimeDiff(date2, date1);
    expect(timeObject.viable).toBeTruthy();
    expect(timeObject.minutes).toBe(13);
  });

  it('sets the number of seconds between the two given dates', function () {
    var date1 =  new Date(2014, 5, 11, 14, 14, 30, 0);
    var date2 =  new Date(2014, 5, 11, 14, 14, 15, 0);

    var timeObject = service.getTimeDiff(date2, date1);
    expect(timeObject.viable).toBeTruthy();
    expect(timeObject.seconds).toBe(15);
  });
});