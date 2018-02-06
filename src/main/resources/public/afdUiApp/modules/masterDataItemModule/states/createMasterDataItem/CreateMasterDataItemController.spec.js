'use strict';

describe('AfdUiAppMasterDataItemModule CreateMasterDataItemController:', function() {

	// Dependencies
	var scope, $rootScope, $stateParams, $controller, CreateMasterDataItemController, createMasterDataItemForm, $compile, $state, MasterDataItemService, MasterDataItemPrototype, $q, $httpBackend, $templateCache;

	var createMasterDataItemController;

	beforeEach(function(){
		module('AfdUiAppMasterDataItemModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			$compile = $injector.get('$compile');
			$state = $injector.get('$state');
			$stateParams = $injector.get('$stateParams');
			MasterDataItemService = $injector.get('MasterDataItemService');
			MasterDataItemPrototype = $injector.get('MasterDataItemPrototype');
			$q = $injector.get('$q');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
		});


		scope = $rootScope.$new();
		$stateParams.id = '100';

		createMasterDataItemController = function(stateMock) {
			if(!stateMock) {
				CreateMasterDataItemController = $controller(
					'CreateMasterDataItemController as createMasterDataItemController', {
						$scope : scope
					});
			}
			else {
				CreateMasterDataItemController = $controller(
					'CreateMasterDataItemController as createMasterDataItemController', {
						$scope : scope,
						$state : stateMock
					});
			}
		};

		createMasterDataItemController();

		var element = angular.element(
			'<form name="createMasterDataItemForm">' +
			'</form>'
		);

		$compile(element)(scope);

		createMasterDataItemForm = scope.createMasterDataItemForm;

		$httpBackend.when('GET','masterdataitem/getMasterDataItem').respond(200);
		$httpBackend.when('GET','afdUiApp/modules/masterDataItemModule/states/masterDataItem/masterDataItemTemplate.html').respond(200);
		$templateCache.put('afdUiApp/modules/masterDataItemModule/states/masterDataItem/masterDataItemTemplate.html');

	});

	it('should be registered', function() {
		expect(CreateMasterDataItemController).toBeDefined();
	});


	describe('masterDataItem selection storage and state management:', function() {
		it('should have an object to store values in', function() {
			expect(scope.createMasterDataItemController.masterDataItem).toBeDefined();
		});

		it('should initialize the masterDataItem object to a new masterDataItem', function() {
			scope.createMasterDataItemController.isEditing = false;
			var emptyMasterDataItem = new MasterDataItemPrototype();
			emptyMasterDataItem.active = true;
			expect(scope.createMasterDataItemController.masterDataItem).toEqual(emptyMasterDataItem);
		});
	});

	describe('cancel():',function() {
		beforeEach(function() {
			spyOn($state, 'go');
		});

		it('should navigate back to masterDataItem table view if masterDataItem creation is cancelled', function(){
			scope.createMasterDataItemController.cancel();

			expect($state.go).toHaveBeenCalledWith('masterDataItem', ({id:'100'}));
		});
	});

	describe('submitMasterDataItem():', function(){

		it('should call createMasterDataItem and navigate to masterDataItem if the creation is successful', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});
			
			scope.createMasterDataItemController.isEditing = false;

			spyOn(MasterDataItemService,'createMasterDataItem').and.callFake(function(createMasterDataItemForm){
				return $q.when('success');
			});

			scope.createMasterDataItemController.submitMasterDataItem();

			scope.$apply();

			expect($state.go).toHaveBeenCalled();
			expect(MasterDataItemService.createMasterDataItem).toHaveBeenCalled();
		});

		it('should call updateMasterDataItem and navigate to masterDataItem if the update is successful and we came from masterDataItem', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});

			spyOn(MasterDataItemService,'updateMasterDataItem').and.callFake(function(){
				return $q.when('success');
			});

			scope.createMasterDataItemController.isEditing = true;

			scope.createMasterDataItemController.submitMasterDataItem();

			expect(MasterDataItemService.updateMasterDataItem).toHaveBeenCalled();

			scope.$apply();

			expect($state.go).toHaveBeenCalledWith('masterDataItem', ({id:'100'}));
		});

		it('should not transition states if the creation is unsuccessful and should set submitInProgess to false', function(){

			spyOn(MasterDataItemService,'createMasterDataItem').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);

			scope.createMasterDataItemController.submitMasterDataItem();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.createMasterDataItemController.submitInProgress).toEqual(false);
		});

		it('should not transition states if the update is unsuccessful and should set submitInProgess to false', function(){

			spyOn(MasterDataItemService,'updateMasterDataItem').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);
			scope.createMasterDataItemController.isEditing = true;

			scope.createMasterDataItemController.submitMasterDataItem();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.createMasterDataItemController.submitInProgress).toEqual(false);
		});

		it('in update error case, it should set the masterDataItem object to the updated masterDataItem if one is available', function(){

			spyOn(MasterDataItemService,'updateMasterDataItem').and.callFake(function(){
				return $q.reject({error: 'test', updatedMasterDataItem: 'thing'});
			});
			spyOn($state, 'go').and.returnValue(true);
			scope.createMasterDataItemController.isEditing = true;

			scope.createMasterDataItemController.submitMasterDataItem();

			scope.$apply();
			expect(scope.createMasterDataItemController.masterDataItem).toEqual('thing', ({id:'100'}));
		});
	});

});
