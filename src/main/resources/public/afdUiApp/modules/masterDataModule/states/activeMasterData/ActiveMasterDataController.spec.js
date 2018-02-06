'use strict';

describe('AfdUiAppMasterDataModule ActiveMasterDataController:', function() {

	// Dependencies
	var activeMasterDataController, $timeout, WcDataTableService, scope, $rootScope, $controller, WcHttpEndpointPrototype, MasterDataService, $translate, WcAlertConsoleService, $q, $httpBackend, $templateCache, $state;

	// Test data
	var masterData = [
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
		module('AfdUiAppMasterDataModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			MasterDataService = $injector.get('MasterDataService');
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
		$templateCache.put('afdUiApp/modules/masterDataModule/states/activeMasterData/activeMasterDataTemplate.html', '');
		$httpBackend.when('GET', 'masterdata/getMasterData').respond(200);
		$httpBackend.when('GET', 'ping/index.html').respond(200);


		activeMasterDataController = function() {
			$controller(
				'ActiveMasterDataController as activeMasterDataController', {
					$scope: scope,
					masterDatas: masterData
				});
		};

		activeMasterDataController();
	});

	it('should be registered', function() {
		expect(scope.activeMasterDataController).toBeDefined();
	});

	it('should have masterDatas data', function() {
		expect(scope.activeMasterDataController.masterDatas).toEqual(masterData);
	});

	it('should add a name property to each of the masterData in the list', function(){
		expect(scope.activeMasterDataController.masterDatas[0].name).toEqual('List1');
		expect(scope.activeMasterDataController.masterDatas[1].name).toEqual('List2');
	});
});
