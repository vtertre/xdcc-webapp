describe("BotController", function () {
  'use strict';

  var $scope, $routeParams, controller, bots, bot = {};

  beforeEach(function () {
    angular.mock.module('bot');
  });

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $routeParams = { id: 1 };
    bots = jasmine.createSpyObj("resource", ['get']);
    bots.get.andReturn(bot);
    controller = $controller('BotController', {
      $scope: $scope,
      $routeParams: $routeParams,
      Bots: bots
    });
  }));

  it("is defined", function () {
    expect(controller).toBeDefined();
  });

  it("asks the api for the selected bot", function () {
    expect(bots.get).toHaveBeenCalledWith({id: $routeParams.id});
  });

  it("passes the bot to the view", function () {
    expect($scope.bot).toEqual(bot);
  });
});