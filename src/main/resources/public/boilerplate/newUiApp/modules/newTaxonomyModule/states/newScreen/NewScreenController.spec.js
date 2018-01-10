'use strict';

describe('NewUiAppNewTaxonomyModule NewScreenController:', function() {
	var scope, $controller;

	var newScreenController = function() {
		var controller = $controller('NewScreenController as newScreenController', {
			$scope: scope
		});
		return controller;
	};

	beforeEach(function() {
		module('NewUiAppNewTaxonomyModule');

		inject(function($rootScope, $injector) {
			scope = $rootScope.$new();
			$controller = $injector.get('$controller');				
		});

		newScreenController();
	});

	it('should be registered', function() {
		expect(newScreenController).toBeDefined();
	});

	it('should have a Scope', function() {
		expect(scope).toBeDefined();
	});

});