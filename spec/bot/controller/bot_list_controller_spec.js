describe("BotListController", function () {
  'use strict';

  var $scope, controller, bots,
    botCollection = [];

  beforeEach(function () {
    angular.mock.module('bot');
  });

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    bots = jasmine.createSpyObj("resource", ['getAll']);
    bots.getAll.andReturn(botCollection);
    controller = $controller('BotListController', {
      $scope: $scope,
      $route: {},
      Bots: bots
    });
  }));

  it("is defined", function () {
    expect(controller).toBeDefined();
  });

  it("asks the api for the all the available bots", function () {
    expect(bots.getAll).toHaveBeenCalled();
  });

  it("passes the bots to the view", function () {
    expect($scope.bots).toEqual(botCollection);
  });
});