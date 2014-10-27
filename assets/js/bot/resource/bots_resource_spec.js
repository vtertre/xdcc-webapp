describe("Bots", function () {
  'use strict';

  var httpBackend, BotsResource,
    botCollection = [
      {id: 1, name: 'bot1'},
      {id: 2, name: 'bot2'}
    ];

  beforeEach(function () {
    angular.mock.module('bot');
  });

  beforeEach(inject(function ($httpBackend, Bots) {
    httpBackend = $httpBackend;
    BotsResource = Bots;

    httpBackend.when('GET', '/api/bot').respond(botCollection);
    httpBackend.when('GET', '/api/bot/1').respond(botCollection[0]);
    httpBackend.when('GET', '/api/bot/2').respond(botCollection[1]);
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('gets an array when getAll is called', function () {
    httpBackend.expectGET('/api/bot');
    var bots = BotsResource.getAll();
    httpBackend.flush();

    expect(bots instanceof Array).toBeTruthy();
  });

  it('retrieves all the bots when getAll is called', function () {
    httpBackend.expectGET('/api/bot');
    var bots = BotsResource.getAll();
    httpBackend.flush();

    expect(bots.length).toBe(botCollection.length);
    for (var index = 0; index < botCollection.length; ++index) {
      expect(bots[index].name).toEqual(botCollection[index].name)
    }
  });

  it('returns an object when an id is specified', function () {
    httpBackend.expectGET('/api/bot/1');
    var bot = BotsResource.get({id: 1});
    httpBackend.flush();

    expect(bot instanceof Array).toBeFalsy();
  });

  it('retrieves the bot matching the given id', function () {
    httpBackend.expectGET('/api/bot/1');
    var bot = BotsResource.get({id: botCollection[0].id});
    httpBackend.flush();

    expect(bot.id).toEqual(botCollection[0].id);
    expect(bot.name).toEqual(botCollection[0].name);
  });
});