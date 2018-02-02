'use strict';

describe('AfdUiAppModule Module:', function() {
	//Module
	var AfdUiAppModule;

	//Dependencies
	var $templateCache, WcHttpRequestService;

	beforeEach(function() {
		module('AfdUiAppModule');

		inject(function($injector) {
			$templateCache = $injector.get('$templateCache');
			WcHttpRequestService = $injector.get('WcHttpRequestService');
		});

		AfdUiAppModule = angular.module('AfdUiAppModule');
		
		$templateCache.put('afdUiApp/afdUiAppTemplate.html', '');
		$templateCache.put('afdUiApp/states/home/homeTemplate.html', '');
	});

	it('should ensure AfdUiAppModule module was registered', function() {
		expect(AfdUiAppModule).toBeDefined();
	});
});