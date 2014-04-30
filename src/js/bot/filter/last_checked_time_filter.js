(function (angular) {
  'use strict';

  angular.module('bot')
    .filter('lastCheckedTime', function () {
      return function(lastCheckedTime, currentDate) {
        var inputDate = new Date(lastCheckedTime);
        var output, hoursSinceUpdate, minutesSinceUpdate, secondsSinceUpdate;

        if (inputDate.getTime() > currentDate.getTime() || inputDate.getTime() === 0) {
          return '(n/a)';
        }

        secondsSinceUpdate = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);
        minutesSinceUpdate = Math.floor(secondsSinceUpdate / 60);
        hoursSinceUpdate = Math.floor(minutesSinceUpdate / 60);

        if (hoursSinceUpdate > 0) {
          output = hoursSinceUpdate + 'h';
        } else if (hoursSinceUpdate === 0 && minutesSinceUpdate > 0) {
          output = minutesSinceUpdate + 'm';
        } else {
          output = secondsSinceUpdate + 's';
        }

        return '(' + output + '  ago)';
      };
    });
})(angular);