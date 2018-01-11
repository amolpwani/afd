'use strict';

describe('NewUiAppNewAdminModule ListScreenController:', function() {
	var scope, $controller;

	var ListScreenController = function() {
		var controller = $controller('ListScreenController as ListScreenController', {
			$scope: scope
		});
		return controller;
	};

	beforeEach(function() {
		module('NewUiAppNewAdminModule');

		inject(function($rootScope, $injector) {
			scope = $rootScope.$new();
			$controller = $injector.get('$controller');				
		});

		ListScreenController();
	});

	it('should be registered', function() {
		expect(ListScreenController).toBeDefined();
	});

	it('should have a Scope', function() {
		expect(scope).toBeDefined();
	});

});