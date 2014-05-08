(function (angular) {
  'use strict';

  angular.module('bot')
    .filter('lastCheckedTime', ['botService', function (botService) {
      return function(lastCheckedTime, currentDate) {
        var output;
        var timeRepresentation = botService.getTimeDiff(lastCheckedTime, currentDate);

        if (!timeRepresentation.viable) {
          return 'n/a';
        }

        if (timeRepresentation.days > 0) {
          output = timeRepresentation.days + 'd';
        } else if (timeRepresentation.days === 0 && timeRepresentation.hours > 0) {
          output = timeRepresentation.hours + 'h';
        } else if (timeRepresentation.hours === 0 && timeRepresentation.minutes > 0) {
          output = timeRepresentation.minutes + 'min';
        } else {
          output = timeRepresentation.seconds + 's';
        }

        return output + ' ago';
      };
    }]);
})(angular);