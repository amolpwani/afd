'use strict';

describe('AfdUiAppModule:', function() {
	//Module
	var NewUiAppModule;

	//Dependencies
	var $translate, $httpBackend, $templateCache, WcHttpRequestService;

	beforeEach(function() {
		module('NewUiAppModule');

		inject(function($injector) {
			$translate = $injector.get('$translate');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
			WcHttpRequestService = $injector.get('WcHttpRequestService');
		});

		NewUiAppModule = angular.module('NewUiAppModule');
		
		$httpBackend.when('GET', '../translations/en/NewUiApp.json').respond({
			HEADER: 'Application.js Test'
		});

		$templateCache.put('afdUiApp/afdUiAppTemplate.html', '');
		$templateCache.put('afdUiApp/states/home/homeTemplate.html', '');
	});

	it('should ensure AfdUiAppModule module was registered', function() {
		expect(NewUiAppModule).toBeDefined();
	});

	describe('Configuration:', function() {
		it('should have a relative base url set', function(){
			console.log(WcHttpRequestService.configuration.baseUrl);
			expect(WcHttpRequestService.configuration.baseUrl).toEqual('/NewAppWeb/api/');
		});

		it('should route to / on an unknown path', inject(function($rootScope, $location, $urlRouter) {
			var scope = $rootScope.$new();

			$location.path('/unknownpath');
			scope.$emit('$locationChangeSuccess');
			expect($location.path()).toEqual('/');
		}));

		it('should have a default translation language of en', function() {
			expect($translate.preferredLanguage()).toEqual('en');
		});

		it('should have a translation language file prefix and suffix set', function() {
			// WcHttpRequestService.configureDefaults({baseUrl: 'http://www.ford.com/'});
			// $httpBackend.whenGET('http://www.ford.com/bookings').respond(200);

			$httpBackend.expectGET('../translations/en/NewUiApp.json');

			$translate.use('en');
			$httpBackend.flush();
		});
	});
});