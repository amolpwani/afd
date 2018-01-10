'use strict';

describe('NewUiAppComponentsModule:', function() {
	var NewUiAppComponentsModule;

	beforeEach(function() {
		NewUiAppComponentsModule = angular.module('NewUiAppComponentsModule');
	});

	it('should be registered', function() {
		expect(NewUiAppComponentsModule).toBeDefined();
	});

});