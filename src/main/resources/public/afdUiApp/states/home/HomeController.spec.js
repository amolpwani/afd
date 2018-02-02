'use strict';

describe('AfdUiApp Module HomeController:', function() {
	var scope, $controller;

	var homeController = function() {
		var controller = $controller('HomeController as homeController', {
			$scope: scope
		});
		return controller;
	};

	beforeEach(function() {
		module('AfdUiAppModule');

		inject(function($rootScope, $injector) {
			scope = $rootScope.$new();
			$controller = $injector.get('$controller');				
		});

		homeController();
	});

	it('should be registered', function() {
		expect(homeController).toBeDefined();
	});

	it('should have a Scope', function() {
		expect(scope).toBeDefined();
	});

});