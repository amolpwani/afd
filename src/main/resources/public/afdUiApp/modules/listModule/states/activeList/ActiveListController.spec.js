'use strict';

describe('AfdUiAppListModule ActiveListController:', function() {

	// Dependencies
	var activeListController, $timeout, WcDataTableService, scope, $rootScope, $controller, WcHttpEndpointPrototype, ListService, $translate, WcAlertConsoleService, $q, $httpBackend, $templateCache, $state;

	// Test data
	var listData = [
			{
				id: '1',
				name: 'List1',
				description: 'Organization Unit 1',
				active: true
			},
			{
				id: '2',
				name: 'List2',
				description: 'Organization Unit 2',
				active: false
			}
		];

	beforeEach(function() {
		module('AfdUiAppListModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			ListService = $injector.get('ListService');
			$translate = $injector.get('$translate');
			WcAlertConsoleService = $injector.get('WcAlertConsoleService');
			$q = $injector.get('$q');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
			$state = $injector.get('$state');
			WcDataTableService = $injector.get('WcDataTableService');
			$timeout = $injector.get('$timeout');
		});

		scope = $rootScope.$new();

		//we do not have the actual application controller available in this instance. mock out the objects and functions
		//we need on it for the tests to succeed.
		scope.$parent.afdUiAppController = {};
		scope.$parent.afdUiAppController.reloadState = function() {
			//noinspection JSCheckFunctionSignatures
            $state.go($state.current.name, $state.params, {
				reload: true
			});
		};

		//even though we don't use these directly, since we are calling a rootScope apply for promise resolution they are needed.
		$templateCache.put('afdUiApp/modules/listModule/states/activeList/activeListTemplate.html', '');
		$httpBackend.when('GET', 'listdata/getList').respond(200);
		$httpBackend.when('GET', 'ping/index.html').respond(200);


		activeListController = function() {
			$controller(
				'ActiveListController as activeListController', {
					$scope: scope,
					lists: listData
				});
		};

		activeListController();
	});

	it('should be registered', function() {
		expect(scope.activeListController).toBeDefined();
	});

	it('should have lists data', function() {
		expect(scope.activeListController.lists).toEqual(listData);
	});

	it('should add a name property to each of the listData in the list', function(){
		expect(scope.activeListController.lists[0].name).toEqual('List1');
		expect(scope.activeListController.lists[1].name).toEqual('List2');
	});
});
