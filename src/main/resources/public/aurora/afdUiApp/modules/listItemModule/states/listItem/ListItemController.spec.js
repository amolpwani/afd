'use strict';

describe('AfdUiAppListItemModule ListItemController:', function() {

	// Dependencies
	var listItemController, $timeout, WcDataTableService, scope, $rootScope, $controller, WcHttpEndpointPrototype, ListItemService, 
	$translate, WcAlertConsoleService, $q, $httpBackend, $templateCache, $state, ListItemPrototype;

	// Test data
	var listItemData = [
			{
				id: '1',
				code: 'ListItem1',
				description: 'Organization Unit 1',
				active: true
			},
			{
				id: '2',
				code: 'ListItem2',
				description: 'Organization Unit 2',
				active: false
			}
		];

	beforeEach(function() {
		module('AfdUiAppListItemModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			ListItemService = $injector.get('ListItemService');
			$translate = $injector.get('$translate');
			WcAlertConsoleService = $injector.get('WcAlertConsoleService');
			$q = $injector.get('$q');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
			$state = $injector.get('$state');
			WcDataTableService = $injector.get('WcDataTableService');
			$timeout = $injector.get('$timeout');
			ListItemPrototype = $injector.get('ListItemPrototype');
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
		$templateCache.put('afdUiApp/modules/listItemModule/states/listItem/listItemTemplate.html', '');
		$httpBackend.when('GET', 'listdataitems/getItems').respond(200);
		$httpBackend.when('GET', 'listdataitems/getListId').respond(200);
		$httpBackend.when('GET', 'ping/index.html').respond(200);


		listItemController = function() {
			$controller(
				'ListItemController as listItemController', {
					$scope: scope,
					listItems: listItemData
				});
		};

		listItemController();
	});

	it('should be registered', function() {
		expect(scope.listItemController).toBeDefined();
	});

	it('should have listItems data', function() {
		expect(scope.listItemController.listItems).toEqual(listItemData);
	});

	it('should add a name property to each of the listItemData in the list', function(){
		expect(scope.listItemController.listItems[0].code).toEqual('ListItem1');
		expect(scope.listItemController.listItems[1].code).toEqual('ListItem2');
	});

	it('should have processAndDisplayDeletionResults, deleteListItems, updateListItem and getselectedListItemObjects functions', function() {
		expect(scope.listItemController.processAndDisplayDeletionResults).toBeDefined();
		expect(scope.listItemController.deleteListItems).toBeDefined();
		expect(scope.listItemController.updateListItem).toBeDefined();
		expect(scope.listItemController.getselectedListItemObjects).toBeDefined();
	});

	describe('processAndDisplayDeletionResults(): ', function() {
		it('should take the given results listItem and create the appropriate messages with the WcAlertConsoleService', function() {
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
			scope.listItemController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage.calls.count()).toEqual(3);
		});

		it('should should not add any messages if no objects are passed in', function() {
			spyOn(WcAlertConsoleService, 'addMessage');

			var testObj = {successfulResults: [], queuedResults: [], failedResults: []};
			scope.listItemController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage).not.toHaveBeenCalled();
		});
	});

	describe('deleteListItems(): ', function() {
		it('should find the confirmation number for the link that was clicked and pass it and scope through to the DeleteModalService, and on return of the promise process and display the results', function() {
			spyOn(ListItemService, 'deleteListItems').and.callFake(function() {
				return $q.when('done');
			});
			spyOn(scope.listItemController, 'processAndDisplayDeletionResults');
			spyOn(scope.$parent.afdUiAppController, 'reloadState');

			scope.listItemController.deleteListItems(listItemData);

			scope.$apply();

			expect(ListItemService.deleteListItems).toHaveBeenCalledWith(listItemData);
			expect(scope.$parent.afdUiAppController.reloadState).toHaveBeenCalled();
		});
	});

	describe('getselectedListItemObjects(): ', function(){
		it('should return an array with a single listItem object when given a single id', function() {
			var result = scope.listItemController.getselectedListItemObjects('1');

			expect(result).toEqual([listItemData[0]]);
		});
		it('should return an array of listItem objects when given an array of ids', function() {
			var result = scope.listItemController.getselectedListItemObjects(['1', '2']);

			expect(result).toEqual(listItemData);
		});
		it('should return an array of listItem objects when given nothing by using the listItemsToDelete array', function() {
			scope.listItemController.listItemsToDelete = ['1', '2'];

			var result = scope.listItemController.getselectedListItemObjects();

			expect(result).toEqual(listItemData);
		});
	});
});
