describe("BotListController", function () {
  'use strict';

  var $scope, $route, controller, bots, botService,
    botCollection = [];

  beforeEach(function () {
    angular.mock.module('bot');
  });

  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    $route = {
      reload: function () {}
    };
    botService = {
      getTimeDiff: function () {}
    };
    bots = jasmine.createSpyObj("resource", ['getAll']);
    bots.getAll.andReturn(botCollection);
    controller = $controller('BotListController', {
      $scope: $scope,
      $route: $route,
      Bots: bots,
      botService: botService
    });
  }));

  it("is defined", function () {
    expect(controller).toBeDefined();
  });

  it("defines the currentDate", function () {
    expect($scope.currentDate).toBeDefined();
    expect($scope.currentDate instanceof Date).toBeTruthy();
  });

  it("does not have errors", function () {
    expect($scope.errors.show).toBeFalsy();
  });

  it("asks the api for the all the available bots", function () {
    expect(bots.getAll).toHaveBeenCalled();
  });

  it("passes the bots to the view", function () {
    expect($scope.bots).toEqual(botCollection);
  });

  it("reloads the route when refreshList is called", function () {
    var routeSpy = spyOn($route, "reload");
    $scope.refreshList();

    expect(routeSpy).toHaveBeenCalled();
  });

  it("returns true when the time since last update is greater than 7 hours", function () {
    var mySpy = spyOn(botService, "getTimeDiff").andReturn({ viable: true, hours: 8 });

    var result = $scope.hasNotBeenCheckedRecently();

    expect(mySpy).toHaveBeenCalled();
    expect(result).toBeTruthy();
  });

  it("returns false when the time since last update is viable", function () {
    var mySpy = spyOn(botService, "getTimeDiff").andReturn({ viable: false, hours: 12 });

    var result = $scope.hasNotBeenCheckedRecently();

    expect(mySpy).toHaveBeenCalled();
    expect(result).toBeFalsy();
  });

  it("returns false when the time since last update is lesser than 7 hours", function () {
    var mySpy = spyOn(botService, "getTimeDiff").andReturn({ viable: true, hours: 2 });

    var result = $scope.hasNotBeenCheckedRecently();

    expect(mySpy).toHaveBeenCalled();
    expect(result).toBeFalsy();
  });
});