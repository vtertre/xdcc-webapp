//= require ../_module.js

(function (angular) {
  'use strict';

  angular.module('bot')
    .factory('botService', function () {
      var timeRepresentation = {};
      return {
        getTimeDiff: function (time, currentDate) {
          var inputDate = new Date(time);
          timeRepresentation = {
            viable: true,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
          };

          if (inputDate.getTime() > currentDate.getTime() || inputDate.getTime() === 0) {
            timeRepresentation.viable = false;
          }

          timeRepresentation.seconds = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);
          timeRepresentation.minutes = Math.floor(timeRepresentation.seconds / 60);
          timeRepresentation.hours = Math.floor(timeRepresentation.minutes / 60);
          timeRepresentation.days = Math.floor(timeRepresentation.hours / 24);

          return timeRepresentation;
        }
      };
    });
})(angular);