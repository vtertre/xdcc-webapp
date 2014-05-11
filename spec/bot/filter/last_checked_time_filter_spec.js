describe("lastCheckedTimeFilter", function () {
  'use strict';

  var filter,
    myBotService = {
      getTimeDiff: function () {}
    };

  beforeEach(function () {
    angular.mock.module('bot');
  });

  beforeEach(module(function ($provide) {
    $provide.factory('botService', function () {
      return myBotService;
    });
  }));

  beforeEach(inject(function (lastCheckedTimeFilter) {
    filter = lastCheckedTimeFilter;
  }));

  it('returns n/a when the time object is not viable', function () {
    var spy = spyOn(myBotService, 'getTimeDiff').andReturn(
      {
        viable: false
      }
    );

    var output = filter();

    expect(spy).toHaveBeenCalled();
    expect(output).toEqual('n/a');
  });

  it('returns the number of days when it is > 0', function () {
    var spy = spyOn(myBotService, 'getTimeDiff').andReturn(
      {
        viable: true,
        days: 3,
        hours: 4,
        minutes: 23,
        seconds: 34
      }
    );

    var output = filter();

    expect(spy).toHaveBeenCalled();
    expect(output).toEqual('3d ago');
  });

  it('returns the number of hours when days = 0 and hours > 0', function () {
    var spy = spyOn(myBotService, 'getTimeDiff').andReturn(
      {
        viable: true,
        days: 0,
        hours: 4,
        minutes: 23,
        seconds: 34
      }
    );

    var output = filter();

    expect(spy).toHaveBeenCalled();
    expect(output).toEqual('4h ago');
  });

  it('returns the number of minutes when days & hours = 0 and minutes > 0', function () {
    var spy = spyOn(myBotService, 'getTimeDiff').andReturn(
      {
        viable: true,
        days: 0,
        hours: 0,
        minutes: 23,
        seconds: 34
      }
    );

    var output = filter();

    expect(spy).toHaveBeenCalled();
    expect(output).toEqual('23min ago');
  });

  it('returns the number of seconds when days, hours & minutes = 0', function () {
    var spy = spyOn(myBotService, 'getTimeDiff').andReturn(
      {
        viable: true,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 34
      }
    );

    var output = filter();

    expect(spy).toHaveBeenCalled();
    expect(output).toEqual('34s ago');
  });
});