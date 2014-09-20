'use strict';

describe('Controller: RecordCtrl', function () {

  // load the controller's module
  beforeEach(module('banterApp'));

  var RecordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecordCtrl = $controller('RecordCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
