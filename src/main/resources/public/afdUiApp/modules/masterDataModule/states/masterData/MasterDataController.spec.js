'use strict';

describe('AfdUiAppMasterDataModule MasterDataController:', function() {

	// Dependencies
	var masterDataController, $timeout, WcDataTableService, scope, $rootScope, $controller, WcHttpEndpointPrototype, FoundationDataColumnService, DeleteModalService, MasterDataItemService, MasterDataService, $translate, WcAlertConsoleService, $q, $httpBackend, $templateCache, $state, MasterDataPrototype;

	// Test data
	var masterDataList = [
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
		module('AfdUiAppMasterDataItemModule');
		module('AfdUiAppFoundationDataColumnModule');
		module('AfdUiAppMasterDataModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			FoundationDataColumnService = $injector.get('FoundationDataColumnService');
			DeleteModalService = $injector.get('DeleteModalService');
			MasterDataItemService = $injector.get('MasterDataItemService');
			MasterDataService = $injector.get('MasterDataService');
			$translate = $injector.get('$translate');
			WcAlertConsoleService = $injector.get('WcAlertConsoleService');
			$q = $injector.get('$q');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
			$state = $injector.get('$state');
			WcDataTableService = $injector.get('WcDataTableService');
			$timeout = $injector.get('$timeout');
			MasterDataPrototype = $injector.get('MasterDataPrototype');
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
		$templateCache.put('afdUiApp/modules/masterDataModule/states/masterData/masterDataTemplate.html', '');
		$httpBackend.when('GET', 'masterdata/getMasterData').respond(200);
		$httpBackend.when('GET', 'ping/index.html').respond(200);


		masterDataController = function() {
			$controller(
				'MasterDataController as masterDataController', {
					$scope: scope,
					masterDataList: masterDataList
				});
		};

		masterDataController();
	});

	it('should be registered', function() {
		expect(scope.masterDataController).toBeDefined();
	});

	it('should have masterDataList data', function() {
		expect(scope.masterDataController.masterDataList).toEqual(masterDataList);
	});

	it('should add a name property to each of the masterDataList in the list', function(){
		expect(scope.masterDataController.masterDataList[0].name).toEqual('List1');
		expect(scope.masterDataController.masterDataList[1].name).toEqual('List2');
	});

	it('should have processAndDisplayDeletionResults, deleteMasterDatas, updateList and getSelectedMasterDataObjects functions', function() {
		expect(scope.masterDataController.processAndDisplayDeletionResults).toBeDefined();
		expect(scope.masterDataController.deleteMasterDatas).toBeDefined();
		expect(scope.masterDataController.updateMasterData).toBeDefined();
		expect(scope.masterDataController.getSelectedMasterDataObjects).toBeDefined();
	});

	describe('processAndDisplayDeletionResults(): ', function() {
		it('should take the given results list and create the appropriate messages with the WcAlertConsoleService', function() {
			spyOn(WcAlertConsoleService, 'addMessage');

			var testObj = {
				successfulResults: [{
					name: '1'
				}, {
					name: '2'
				}],
				failedResults: [{
					name: '3'
				}, {
					name: '4'
				}],
				queuedResults: [{
					name: '5'
				}]
			};
			scope.masterDataController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage.calls.count()).toEqual(3);
		});

		it('should should not add any messages if no objects are passed in', function() {
			spyOn(WcAlertConsoleService, 'addMessage');

			var testObj = {successfulResults: [], queuedResults: [], failedResults: []};
			scope.masterDataController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage).not.toHaveBeenCalled();
		});
	});

	describe('deleteMasterDatas(): ', function() {
		it('should find the confirmation number for the link that was clicked and pass it and scope through to the DeleteModalService, and on return of the promise process and display the results', function() {

			spyOn(MasterDataService, 'deleteMasterDatas').and.callFake(function() {
				return $q.when('done');
			});
			spyOn(scope.masterDataController, 'processAndDisplayDeletionResults');
			spyOn(scope.$parent.afdUiAppController, 'reloadState');

			scope.masterDataController.deleteMasterDatas(masterDataList);

			scope.$apply();

			expect(MasterDataService.deleteMasterDatas).toHaveBeenCalledWith(masterDataList);
			expect(scope.$parent.afdUiAppController.reloadState).toHaveBeenCalled();
		});
	});

	describe('getSelectedMasterDataObjects(): ', function(){
		it('should return an array with a single list object when given a single id', function() {
			var result = scope.masterDataController.getSelectedMasterDataObjects('1');

			expect(result).toEqual([masterDataList[0]]);
		});
		it('should return an array of matserData objects when given an array of ids', function() {
			var result = scope.masterDataController.getSelectedMasterDataObjects(['1', '2']);

			expect(result).toEqual(masterDataList);
		});
		it('should return an array of matserData objects when given nothing by using the masterDataListToDelete array', function() {
			scope.masterDataController.masterDataListToDelete = ['1', '2'];

			var result = scope.masterDataController.getSelectedMasterDataObjects();

			expect(result).toEqual(masterDataList);
		});
	});
});
