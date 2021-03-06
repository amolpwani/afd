'use strict';

describe('AfdUiAppModule AfdUiAppController:', function() {
	var scope = null,
		$httpBackend, $controller, $q;

	var afdUiAppController = function() {
		var controller = $controller('AfdUiAppController as afdUiAppController', {
			$scope: scope
		});
		return controller;
	};

	beforeEach(function() {
		module('AfdUiAppModule');

		inject(function($rootScope, $injector) {
			scope = $rootScope.$new();
			$controller = $injector.get('$controller');				
			$httpBackend = $injector.get('$httpBackend');
			$q = $injector.get('$q');
		});

		afdUiAppController();

		$httpBackend.when('GET', '').respond(200);
	});

	it('should be registered', function() {
		expect(afdUiAppController).toBeDefined();
	});

	it('should have a Scope', function() {
		expect(scope).toBeDefined();
	});

});