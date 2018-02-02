'use strict';

describe('AfdUiAppListItemModule CreateListItemController:', function() {

	// Dependencies
	var scope, $rootScope, $stateParams, $controller, CreateListItemController, createListItemForm, $compile, $state, ListItemService, ListItemPrototype, $q, $httpBackend, $templateCache;

	var createListItemController;

	beforeEach(function(){
		module('AfdUiAppListItemModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			$compile = $injector.get('$compile');
			$state = $injector.get('$state');
			$stateParams = $injector.get('$stateParams');
			ListItemService = $injector.get('ListItemService');
			ListItemPrototype = $injector.get('ListItemPrototype');
			$q = $injector.get('$q');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
		});


		scope = $rootScope.$new();
		$stateParams.id = '100';

		createListItemController = function(stateMock) {
			if(!stateMock) {
				CreateListItemController = $controller(
					'CreateListItemController as createListItemController', {
						$scope : scope
					});
			}
			else {
				CreateListItemController = $controller(
					'CreateListItemController as createListItemController', {
						$scope : scope,
						$state : stateMock
					});
			}
		};

		createListItemController();

		var element = angular.element(
			'<form name="createListItemForm">' +
			'</form>'
		);

		$compile(element)(scope);

		createListItemForm = scope.createListItemForm;

		$httpBackend.when('GET','listdataitems/getItems').respond(200);
		$httpBackend.when('GET','afdUiApp/modules/listItemModule/states/listItem/listItemTemplate.html').respond(200);
		$templateCache.put('afdUiApp/modules/listItemModule/states/listItem/listItemTemplate.html');

	});

	it('should be registered', function() {
		expect(CreateListItemController).toBeDefined();
	});


	describe('listItem selection storage and state management:', function() {
		it('should have an object to store values in', function() {
			expect(scope.createListItemController.listItem).toBeDefined();
		});

		it('should initialize the list object to a new listItem', function() {
			scope.createListItemController.isEditing = false;
			var emptyListItem = new ListItemPrototype();
			emptyListItem.active = true;
			expect(scope.createListItemController.listItem).toEqual(emptyListItem);
		});
	});

	describe('cancel():',function() {
		beforeEach(function() {
			spyOn($state, 'go');
		});

		it('should navigate back to list table view if list creation is cancelled', function(){
			scope.createListItemController.cancel();

			expect($state.go).toHaveBeenCalledWith('listItem', ({id:'100'}));
		});
	});

	describe('submitListItem():', function(){

		it('should call createListItem and navigate to list if the creation is successful', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});
			
			scope.createListItemController.isEditing = false;

			spyOn(ListItemService,'createListItem').and.callFake(function(createListItemForm){
				return $q.when('success');
			});

			scope.createListItemController.submitListItem();

			scope.$apply();

			expect($state.go).toHaveBeenCalled();
			expect(ListItemService.createListItem).toHaveBeenCalled();
		});

		it('should call updateListItem and navigate to list if the update is successful and we came from list', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});

			spyOn(ListItemService,'updateListItem').and.callFake(function(){
				return $q.when('success');
			});

			scope.createListItemController.isEditing = true;

			scope.createListItemController.submitListItem();

			expect(ListItemService.updateListItem).toHaveBeenCalled();

			scope.$apply();

			expect($state.go).toHaveBeenCalledWith('listItem', ({id:'100'}));
		});

		it('should not transition states if the creation is unsuccessful and should set submitInProgess to false', function(){

			spyOn(ListItemService,'createListItem').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);

			scope.createListItemController.submitListItem();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.createListItemController.submitInProgress).toEqual(false);
		});

		it('should not transition states if the update is unsuccessful and should set submitInProgess to false', function(){

			spyOn(ListItemService,'updateListItem').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);
			scope.createListItemController.isEditing = true;

			scope.createListItemController.submitListItem();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.createListItemController.submitInProgress).toEqual(false);
		});

		it('in update error case, it should set the list object to the updated list if one is available', function(){

			spyOn(ListItemService,'updateListItem').and.callFake(function(){
				return $q.reject({error: 'test', updatedListItem: 'thing'});
			});
			spyOn($state, 'go').and.returnValue(true);
			scope.createListItemController.isEditing = true;

			scope.createListItemController.submitListItem();

			scope.$apply();
			expect(scope.createListItemController.listItem).toEqual('thing', ({id:'100'}));
		});
	});

});
