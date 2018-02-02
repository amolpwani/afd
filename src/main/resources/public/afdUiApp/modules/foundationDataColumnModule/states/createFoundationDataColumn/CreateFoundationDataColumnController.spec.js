'use strict';

describe('AfdUiAppFoundationDataColumnModule CreateFoundationDataColumnController:', function() {

	// Dependencies
	var scope, $rootScope, $controller, CreateFoundationDataColumnController, createFoundationDataColumnForm, $compile, $state, 
	FoundationDataColumnService, ListService, lists, foundationDataColumns, FoundationDataColumnPrototype, $q, $httpBackend, $templateCache, $translate;

	var createFoundationDataColumnController;
	lists = [{'id':1, 'name':'List1'},{'id':2, 'name':'List2'}];
	foundationDataColumns = [{'id':1, 'uiColumnName':'Column1'},{'id':2, 'uiColumnName':'Column2'}]

	beforeEach(function(){
		module('AfdUiAppFoundationDataColumnModule');
		module('AfdUiAppListComponentsModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			$compile = $injector.get('$compile');
			$state = $injector.get('$state');
			FoundationDataColumnService = $injector.get('FoundationDataColumnService');
			ListService = $injector.get('ListService');
			FoundationDataColumnPrototype = $injector.get('FoundationDataColumnPrototype');
			$q = $injector.get('$q');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
			$translate = $injector.get('$translate');
		});


		scope = $rootScope.$new();

		createFoundationDataColumnController = function(stateMock) {
			if(!stateMock) {

				CreateFoundationDataColumnController = $controller(
					'CreateFoundationDataColumnController as createFoundationDataColumnController', {
						$scope : scope,
						lists: lists,
						foundationDataColumns: foundationDataColumns
					});
			}
			else {
				CreateFoundationDataColumnController = $controller(
					'CreateFoundationDataColumnController as createFoundationDataColumnController', {
						$scope : scope,
						$state : stateMock
					});
			}
		};

		createFoundationDataColumnController();

		var element = angular.element(
			'<form name="createFoundationDataColumnForm">' +
			'</form>'
		);

		$compile(element)(scope);

		createFoundationDataColumnForm = scope.createFoundationDataColumnForm;

		$httpBackend.when('GET','foundationdatacolumn/getFoundationColumn').respond(200);
		$httpBackend.when('GET','listdata/getList').respond(200);
		$httpBackend.when('GET','afdUiApp/modules/foundationDataColumnModule/states/foundationDataColumn/foundationDataColumnTemplate.html').respond(200);
		$templateCache.put('afdUiApp/modules/foundationDataColumnModule/states/foundationDataColumn/foundationDataColumnTemplate.html');

	});

	it('should be registered', function() {
		expect(CreateFoundationDataColumnController).toBeDefined();
	});


	describe('foundationdataccolumn selection storage and state management:', function() {
		it('should have an object to store values in', function() {
			expect(scope.createFoundationDataColumnController.foundationDataColumn).toBeDefined();
		});

		it('should initialize the foundationDataColumn object to a new foundationDataColumn', function() {
			scope.createFoundationDataColumnController.isEditing = false;
			var emptyFoundationDataColumn = new FoundationDataColumnPrototype();
			emptyFoundationDataColumn.active = true;
			expect(scope.createFoundationDataColumnController.foundationDataColumn).toEqual(emptyFoundationDataColumn);
		});

	});

	describe('cancel():',function() {
		beforeEach(function() {
			spyOn($state, 'go');
		});

		it('should navigate back to foundationDataColumn table view if foundationDataColumn creation is cancelled', function(){
			scope.createFoundationDataColumnController.cancel();

			expect($state.go).toHaveBeenCalledWith('foundationDataColumn');
		});
	});

	describe('submitFoundationDataColumn():', function(){

		it('should call createFoundationDataColumn and navigate to foundationDataColumn table if the creation is successful', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});
			
			scope.createFoundationDataColumnController.isEditing = false;

			spyOn(FoundationDataColumnService,'createFoundationDataColumn').and.callFake(function(createFoundationDataColumnForm){
				return $q.when('success');
			});

			scope.createFoundationDataColumnController.submitFoundationDataColumn();

			scope.$apply();

			expect($state.go).toHaveBeenCalled();
			expect(FoundationDataColumnService.createFoundationDataColumn).toHaveBeenCalled();

		});

		it('should call updateFoundationDataColumn and navigate to list if the update is successful and we came from list', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});

			spyOn(FoundationDataColumnService,'updateFoundationDataColumn').and.callFake(function(){
				return $q.when('success');
			});

			scope.createFoundationDataColumnController.isEditing = true;

			scope.createFoundationDataColumnController.submitFoundationDataColumn();

			expect(FoundationDataColumnService.updateFoundationDataColumn).toHaveBeenCalled();

			scope.$apply();

			expect($state.go).toHaveBeenCalledWith('foundationDataColumn');


		});

		it('should not transition states if the creation is unsuccessful and should set submitInProgess to false', function(){

			spyOn(FoundationDataColumnService,'createFoundationDataColumn').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);

			scope.createFoundationDataColumnController.submitFoundationDataColumn();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.createFoundationDataColumnController.submitInProgress).toEqual(false);
		});

		it('should not transition states if the update is unsuccessful and should set submitInProgess to false', function(){

			spyOn(FoundationDataColumnService,'updateFoundationDataColumn').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);
			scope.createFoundationDataColumnController.isEditing = true;

			scope.createFoundationDataColumnController.submitFoundationDataColumn();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.createFoundationDataColumnController.submitInProgress).toEqual(false);
		});

		it('in update error case, it should set the list object to the updated foundationDataColumn if one is available', function(){

			spyOn(FoundationDataColumnService,'updateFoundationDataColumn').and.callFake(function(){
				return $q.reject({error: 'test', updatedFoundationDataColumn: 'thing'});
			});
			spyOn($state, 'go').and.returnValue(true);
			scope.createFoundationDataColumnController.isEditing = true;

			scope.createFoundationDataColumnController.submitFoundationDataColumn();

			scope.$apply();
			expect(scope.createFoundationDataColumnController.foundationDataColumn).toEqual('thing');
		});
	});

});
