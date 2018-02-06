'use strict';

describe('AfdUiAppMasterDataItemModule MasterDataItemController:', function() {

	// Dependencies
	var masterDataItemController, $timeout, WcDataTableService, scope, $rootScope, $controller, WcHttpEndpointPrototype, FoundationDataColumnService, DeleteModalService, MasterDataItemService, MasterDataService, 
	$translate, WcAlertConsoleService, $q, $httpBackend, $templateCache, $state, MasterDataItemPrototype;

	// Test data
	var masterDataItemData = [
			{
				id: '1',
				code: 'MasterDataItem1',
				description: 'Organization Unit 1',
				active: true
			},
			{
				id: '2',
				code: 'MasterDataItem2',
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
			MasterDataItemPrototype = $injector.get('MasterDataItemPrototype');
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
		$templateCache.put('afdUiApp/modules/masterDataItemModule/states/masterDataItem/masterDataItemTemplate.html', '');
		$httpBackend.when('GET', 'masterdataitem/getItems').respond(200);
		$httpBackend.when('GET', 'masterdataitem/getMasterDataItemByMasterDataId').respond(200);
		$httpBackend.when('GET', 'ping/index.html').respond(200);


		masterDataItemController = function() {
			$controller(
				'MasterDataItemController as masterDataItemController', {
					$scope: scope,
					masterDataItems: masterDataItemData
				});
		};

		masterDataItemController();
	});

	it('should be registered', function() {
		expect(scope.masterDataItemController).toBeDefined();
	});

	it('should have masterDataItems data', function() {
		expect(scope.masterDataItemController.masterDataItems).toEqual(masterDataItemData);
	});

	it('should add a name property to each of the masterDataItemData in the list', function(){
		expect(scope.masterDataItemController.masterDataItems[0].code).toEqual('MasterDataItem1');
		expect(scope.masterDataItemController.masterDataItems[1].code).toEqual('MasterDataItem2');
	});

	it('should have processAndDisplayDeletionResults, deleteMasterDataItems, updateMasterDataItem and getselectedMasterDataItemObjects functions', function() {
		expect(scope.masterDataItemController.processAndDisplayDeletionResults).toBeDefined();
		expect(scope.masterDataItemController.deleteMasterDataItems).toBeDefined();
		expect(scope.masterDataItemController.updateMasterDataItem).toBeDefined();
		expect(scope.masterDataItemController.getselectedMasterDataItemObjects).toBeDefined();
	});

	describe('processAndDisplayDeletionResults(): ', function() {
		it('should take the given results masterDataItem and create the appropriate messages with the WcAlertConsoleService', function() {
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
			scope.masterDataItemController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage.calls.count()).toEqual(3);
		});

		it('should should not add any messages if no objects are passed in', function() {
			spyOn(WcAlertConsoleService, 'addMessage');

			var testObj = {successfulResults: [], queuedResults: [], failedResults: []};
			scope.masterDataItemController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage).not.toHaveBeenCalled();
		});
	});

	describe('deleteMasterDataItems(): ', function() {
		it('should find the confirmation number for the link that was clicked and pass it and scope through to the DeleteModalService, and on return of the promise process and display the results', function() {
			spyOn(MasterDataItemService, 'deleteMasterDataItems').and.callFake(function() {
				return $q.when('done');
			});
			spyOn(scope.masterDataItemController, 'processAndDisplayDeletionResults');
			spyOn(scope.$parent.afdUiAppController, 'reloadState');

			scope.masterDataItemController.deleteMasterDataItems(masterDataItemData);

			scope.$apply();

			expect(MasterDataItemService.deleteMasterDataItems).toHaveBeenCalledWith(masterDataItemData);
			expect(scope.$parent.afdUiAppController.reloadState).toHaveBeenCalled();
		});
	});

	describe('getselectedMasterDataItemObjects(): ', function(){
		it('should return an array with a single masterDataItem object when given a single id', function() {
			var result = scope.masterDataItemController.getselectedMasterDataItemObjects('1');

			expect(result).toEqual([masterDataItemData[0]]);
		});
		it('should return an array of masterDataItem objects when given an array of ids', function() {
			var result = scope.masterDataItemController.getselectedMasterDataItemObjects(['1', '2']);

			expect(result).toEqual(masterDataItemData);
		});
		it('should return an array of masterDataItem objects when given nothing by using the masterDataItemsToDelete array', function() {
			scope.masterDataItemController.masterDataItemsToDelete = ['1', '2'];

			var result = scope.masterDataItemController.getselectedMasterDataItemObjects();

			expect(result).toEqual(masterDataItemData);
		});
	});
});
