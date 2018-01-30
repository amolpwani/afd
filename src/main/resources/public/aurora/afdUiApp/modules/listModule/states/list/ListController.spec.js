'use strict';

describe('AfdUiAppListModule ListController:', function() {

	// Dependencies
	var listController, $timeout, WcDataTableService, scope, $rootScope, $controller, WcHttpEndpointPrototype, ListService, $translate, WcAlertConsoleService, $q, $httpBackend, $templateCache, $state, ListPrototype;

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
			ListPrototype = $injector.get('ListPrototype');
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
		$templateCache.put('afdUiApp/modules/listModule/states/list/listTemplate.html', '');
		$httpBackend.when('GET', 'listdata/getList').respond(200);
		$httpBackend.when('GET', 'ping/index.html').respond(200);


		listController = function() {
			$controller(
				'ListController as listController', {
					$scope: scope,
					lists: listData
				});
		};

		listController();
	});

	it('should be registered', function() {
		expect(scope.listController).toBeDefined();
	});

	it('should have lists data', function() {
		expect(scope.listController.lists).toEqual(listData);
	});

	it('should add a name property to each of the listData in the list', function(){
		expect(scope.listController.lists[0].name).toEqual('List1');
		expect(scope.listController.lists[1].name).toEqual('List2');
	});

	it('should have processAndDisplayDeletionResults, deleteLists, updateList and getSelectedListObjects functions', function() {
		expect(scope.listController.processAndDisplayDeletionResults).toBeDefined();
		expect(scope.listController.deleteLists).toBeDefined();
		expect(scope.listController.updateList).toBeDefined();
		expect(scope.listController.getSelectedListObjects).toBeDefined();
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
			scope.listController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage.calls.count()).toEqual(3);
		});

		it('should should not add any messages if no objects are passed in', function() {
			spyOn(WcAlertConsoleService, 'addMessage');

			var testObj = {successfulResults: [], queuedResults: [], failedResults: []};
			scope.listController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage).not.toHaveBeenCalled();
		});
	});

	describe('deleteLists(): ', function() {
		it('should find the confirmation number for the link that was clicked and pass it and scope through to the DeleteModalService, and on return of the promise process and display the results', function() {
			spyOn(ListService, 'deleteLists').and.callFake(function() {
				return $q.when('done');
			});
			spyOn(scope.listController, 'processAndDisplayDeletionResults');
			spyOn(scope.$parent.afdUiAppController, 'reloadState');

			scope.listController.deleteLists(listData);

			scope.$apply();

			expect(ListService.deleteLists).toHaveBeenCalledWith(listData);
			expect(scope.$parent.afdUiAppController.reloadState).toHaveBeenCalled();
		});
	});

	describe('getSelectedListObjects(): ', function(){
		it('should return an array with a single list object when given a single id', function() {
			var result = scope.listController.getSelectedListObjects('1');

			expect(result).toEqual([listData[0]]);
		});
		it('should return an array of list objects when given an array of ids', function() {
			var result = scope.listController.getSelectedListObjects(['1', '2']);

			expect(result).toEqual(listData);
		});
		it('should return an array of list objects when given nothing by using the listsToDelete array', function() {
			scope.listController.listsToDelete = ['1', '2'];

			var result = scope.listController.getSelectedListObjects();

			expect(result).toEqual(listData);
		});
	});
});
