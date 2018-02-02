'use strict';

describe('AfdUiAppFoundationDataColumnModule FoundationDataColumnController:', function() {

	// Dependencies
	var foundationDataColumnController, $timeout, WcDataTableService, scope, $rootScope, $controller, WcHttpEndpointPrototype, FoundationDataColumnService, lists, $translate, WcAlertConsoleService, $q, $httpBackend, $templateCache, $state;
	lists = [{'id':1, 'name':'List1'},{'id':2, 'name':'List2'}];

	// Test data
	var foundationDataColumn = [
			{
				id: '1',
				uiColumnName: 'Column1',
				hoverHelp: 'Column 1 Help',
				uniqueColumn: true,
				inputType: 'Text',
				value: 'Column 1 value',
				mandatory: true,
				sortOrder: 1,
				editable: true,
				length: 200
			},
			{
				id: '2',
				uiColumnName: 'Column2',
				hoverHelp: 'Column 2 Help',
				uniqueColumn: false,
				inputType: 'List',
				value: '',
				mandatory: true,
				sortOrder: 1,
				editable: false,
				length: 200
			}
		];

	beforeEach(function() {
		module('AfdUiAppFoundationDataColumnModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			FoundationDataColumnService = $injector.get('FoundationDataColumnService');
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
		$templateCache.put('afdUiApp/modules/foundationDataColumnModule/states/foundationDataColumn/foundationDataColumnTemplate.html', '');
		$httpBackend.when('GET', 'foundationdatacolumn/getFoundationColumn').respond(200);
		$httpBackend.when('GET', 'ping/index.html').respond(200);


		foundationDataColumnController = function() {
			$controller(
				'FoundationDataColumnController as foundationDataColumnController', {
					$scope: scope,
					foundationDataColumns: foundationDataColumn,
					lists: lists,
				});
		};

		foundationDataColumnController();
	});

	it('should be registered', function() {
		expect(scope.foundationDataColumnController).toBeDefined();
	});

	it('should have foundationDataColumns data', function() {
		expect(scope.foundationDataColumnController.foundationDataColumns).toEqual(foundationDataColumn);
	});

	it('should add a name property to each of the foundationDataColumn in the list', function(){
		expect(scope.foundationDataColumnController.foundationDataColumns[0].uiColumnName).toEqual('Column1');
		expect(scope.foundationDataColumnController.foundationDataColumns[1].uiColumnName).toEqual('Column2');
	});

	it('should have processAndDisplayDeletionResults, deleteFoundationDataColumns, updateFoundationDataColumn and getSelectedFoundationDataColumnObjects functions', function() {
		expect(scope.foundationDataColumnController.processAndDisplayDeletionResults).toBeDefined();
		expect(scope.foundationDataColumnController.deleteFoundationDataColumns).toBeDefined();
		expect(scope.foundationDataColumnController.updateFoundationDataColumn).toBeDefined();
		expect(scope.foundationDataColumnController.getSelectedFoundationDataColumnObjects).toBeDefined();
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
			scope.foundationDataColumnController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage.calls.count()).toEqual(3);
		});

		it('should should not add any messages if no objects are passed in', function() {
			spyOn(WcAlertConsoleService, 'addMessage');

			var testObj = {successfulResults: [], queuedResults: [], failedResults: []};
			scope.foundationDataColumnController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage).not.toHaveBeenCalled();
		});
	});

	describe('deleteFoundationDataColumns(): ', function() {
		it('should find the confirmation number for the link that was clicked and pass it and scope through to the DeleteModalService, and on return of the promise process and display the results', function() {
			spyOn(FoundationDataColumnService, 'deleteFoundationDataColumns').and.callFake(function() {
				return $q.when('done');
			});
			spyOn(scope.foundationDataColumnController, 'processAndDisplayDeletionResults');
			spyOn(scope.$parent.afdUiAppController, 'reloadState');

			scope.foundationDataColumnController.deleteFoundationDataColumns(foundationDataColumn);

			scope.$apply();

			expect(FoundationDataColumnService.deleteFoundationDataColumns).toHaveBeenCalledWith(foundationDataColumn);
			expect(scope.$parent.afdUiAppController.reloadState).toHaveBeenCalled();
		});
	});

	describe('getSelectedFoundationDataColumnObjects(): ', function(){
		it('should return an array with a single foundationDataColumn object when given a single id', function() {
			var result = scope.foundationDataColumnController.getSelectedFoundationDataColumnObjects('1');

			expect(result).toEqual([foundationDataColumn[0]]);
		});
		it('should return an array of foundationDataColumn objects when given an array of ids', function() {
			var result = scope.foundationDataColumnController.getSelectedFoundationDataColumnObjects(['1', '2']);

			expect(result).toEqual(foundationDataColumn);
		});
		it('should return an array of foundationDataColumn objects when given nothing by using the foundationDataColumnsToDelete array', function() {
			scope.foundationDataColumnController.foundationDataColumnsToDelete = ['1', '2'];

			var result = scope.foundationDataColumnController.getSelectedFoundationDataColumnObjects();

			expect(result).toEqual(foundationDataColumn);
		});
	});
});
