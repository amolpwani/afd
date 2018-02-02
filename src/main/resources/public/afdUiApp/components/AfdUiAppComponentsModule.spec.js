'use strict';

describe('AfdUiAppComponentsModule:', function() {
	var AfdUiAppComponentsModule;

	beforeEach(function() {
		AfdUiAppComponentsModule = angular.module('AfdUiAppComponentsModule');
	});

	it('should be registered', function() {
		expect(AfdUiAppComponentsModule).toBeDefined();
	});

});