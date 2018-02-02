'use strict';

describe('AfdUiAppListModule CreateListController:', function() {

	// Dependencies
	var scope, $rootScope, $controller, CreateListController, createListForm, $compile, $state, ListService, ListPrototype, $q, $httpBackend, $templateCache;

	var createListController;

	beforeEach(function(){
		module('AfdUiAppListModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			$compile = $injector.get('$compile');
			$state = $injector.get('$state');
			ListService = $injector.get('ListService');
			ListPrototype = $injector.get('ListPrototype');
			$q = $injector.get('$q');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
		});


		scope = $rootScope.$new();

		createListController = function(stateMock) {
			if(!stateMock) {
				CreateListController = $controller(
					'CreateListController as createListController', {
						$scope : scope
					});
			}
			else {
				CreateListController = $controller(
					'CreateListController as createListController', {
						$scope : scope,
						$state : stateMock
					});
			}
		};

		createListController();

		var element = angular.element(
			'<form name="createListForm">' +
			'</form>'
		);

		$compile(element)(scope);

		createListForm = scope.createListForm;

		$httpBackend.when('GET','listdata/getList').respond(200);
		$httpBackend.when('GET','afdUiApp/modules/listModule/states/list/listTemplate.html').respond(200);
		$templateCache.put('afdUiApp/modules/listModule/states/list/listTemplate.html');

	});

	it('should be registered', function() {
		expect(CreateListController).toBeDefined();
	});


	describe('list selection storage and state management:', function() {
		it('should have an object to store values in', function() {
			expect(scope.createListController.list).toBeDefined();
		});

		it('should initialize the list object to a new list', function() {
			scope.createListController.isEditing = false;
			var emptyList = new ListPrototype();
			emptyList.active = true;
			expect(scope.createListController.list).toEqual(emptyList);
		});

	});

	describe('cancel():',function() {
		beforeEach(function() {
			spyOn($state, 'go');
		});

		it('should navigate back to list table view if list creation is cancelled', function(){
			scope.createListController.cancel();

			expect($state.go).toHaveBeenCalledWith('list');
		});
	});

	describe('submitList():', function(){

		it('should call createList and navigate to list if the creation is successful', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});
			
			scope.createListController.isEditing = false;

			spyOn(ListService,'createList').and.callFake(function(createListForm){
				return $q.when('success');
			});

			scope.createListController.submitList();

			scope.$apply();

			expect($state.go).toHaveBeenCalled();
			expect(ListService.createList).toHaveBeenCalled();

		});

		it('should call updateList and navigate to list if the update is successful and we came from list', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});

			spyOn(ListService,'updateList').and.callFake(function(){
				return $q.when('success');
			});

			scope.createListController.isEditing = true;

			scope.createListController.submitList();

			expect(ListService.updateList).toHaveBeenCalled();

			scope.$apply();

			expect($state.go).toHaveBeenCalledWith('list');


		});

		it('should not transition states if the creation is unsuccessful and should set submitInProgess to false', function(){

			spyOn(ListService,'createList').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);

			scope.createListController.submitList();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.createListController.submitInProgress).toEqual(false);
		});

		it('should not transition states if the update is unsuccessful and should set submitInProgess to false', function(){

			spyOn(ListService,'updateList').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);
			scope.createListController.isEditing = true;

			scope.createListController.submitList();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.createListController.submitInProgress).toEqual(false);
		});

		it('in update error case, it should set the list object to the updated list if one is available', function(){

			spyOn(ListService,'updateList').and.callFake(function(){
				return $q.reject({error: 'test', updatedList: 'thing'});
			});
			spyOn($state, 'go').and.returnValue(true);
			scope.createListController.isEditing = true;

			scope.createListController.submitList();

			scope.$apply();
			expect(scope.createListController.list).toEqual('thing');
		});
	});

});
