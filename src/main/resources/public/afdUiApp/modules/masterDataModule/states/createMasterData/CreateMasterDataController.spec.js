'use strict';

describe('AfdUiAppMasterDataModule CreateMasterDataController:', function() {

	// Dependencies
	var scope, $rootScope, $controller, CreateMasterDataController, createMasterDataForm, $compile, $state, MasterDataService, MasterDataPrototype, $q, $httpBackend, $templateCache;

	var createMasterDataController;

	beforeEach(function(){
		module('AfdUiAppMasterDataModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			$compile = $injector.get('$compile');
			$state = $injector.get('$state');
			MasterDataService = $injector.get('MasterDataService');
			MasterDataPrototype = $injector.get('MasterDataPrototype');
			$q = $injector.get('$q');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
		});


		scope = $rootScope.$new();

		createMasterDataController = function(stateMock) {
			if(!stateMock) {
				CreateMasterDataController = $controller(
					'CreateMasterDataController as createMasterDataController', {
						$scope : scope
					});
			}
			else {
				CreateMasterDataController = $controller(
					'CreateMasterDataController as createMasterDataController', {
						$scope : scope,
						$state : stateMock
					});
			}
		};

		createMasterDataController();

		var element = angular.element(
			'<form name="createMasterDataForm">' +
			'</form>'
		);

		$compile(element)(scope);

		createMasterDataForm = scope.createMasterDataForm;

		$httpBackend.when('GET','masterdata/getMasterData').respond(200);
		$httpBackend.when('GET','afdUiApp/modules/masterDataModule/states/masterData/listTemplate.html').respond(200);
		$templateCache.put('afdUiApp/modules/masterDataModule/states/masterData/masterDataTemplate.html');

	});

	it('should be registered', function() {
		expect(CreateMasterDataController).toBeDefined();
	});


	describe('list selection storage and state management:', function() {
		it('should have an object to store values in', function() {
			expect(scope.createMasterDataController.masterData).toBeDefined();
		});

		it('should initialize the masterData object to a new masterData', function() {
			scope.createMasterDataController.isEditing = false;
			var emptyMasterData = new MasterDataPrototype();
			emptyMasterData.active = true;
			expect(scope.createMasterDataController.masterData).toEqual(emptyMasterData);
		});

	});

	describe('cancel():',function() {
		beforeEach(function() {
			spyOn($state, 'go');
		});

		it('should navigate back to list table view if list creation is cancelled', function(){
			scope.createMasterDataController.cancel();

			expect($state.go).toHaveBeenCalledWith('masterData');
		});
	});

	describe('submitMasterData():', function(){

		it('should call createMasterData and navigate to masterData if the creation is successful', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});
			
			scope.createMasterDataController.isEditing = false;

			spyOn(MasterDataService,'createMasterData').and.callFake(function(createMasterDataForm){
				return $q.when('success');
			});

			scope.createMasterDataController.submitMasterData();

			scope.$apply();

			expect($state.go).toHaveBeenCalled();
			expect(MasterDataService.createMasterData).toHaveBeenCalled();

		});

		it('should call updateMasterData and navigate to masterData if the update is successful and we came redirect to masterData page', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});

			spyOn(MasterDataService,'updateMasterData').and.callFake(function(){
				return $q.when('success');
			});

			scope.createMasterDataController.isEditing = true;

			scope.createMasterDataController.submitMasterData();

			expect(MasterDataService.updateMasterData).toHaveBeenCalled();

			scope.$apply();

			expect($state.go).toHaveBeenCalledWith('masterData');


		});

		it('should not transition states if the creation is unsuccessful and should set submitInProgess to false', function(){

			spyOn(MasterDataService,'createMasterData').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);

			scope.createMasterDataController.submitMasterData();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.createMasterDataController.submitInProgress).toEqual(false);
		});

		it('should not transition states if the update is unsuccessful and should set submitInProgess to false', function(){

			spyOn(MasterDataService,'updateMasterData').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);
			scope.createMasterDataController.isEditing = true;

			scope.createMasterDataController.submitMasterData();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.createMasterDataController.submitInProgress).toEqual(false);
		});

		it('in update error case, it should set the masterData object to the updated masterData if one is available', function(){

			spyOn(MasterDataService,'updateMasterData').and.callFake(function(){
				return $q.reject({error: 'test', updatedMasterData: 'thing'});
			});
			spyOn($state, 'go').and.returnValue(true);
			scope.createMasterDataController.isEditing = true;

			scope.createMasterDataController.submitMasterData();

			scope.$apply();
			expect(scope.createMasterDataController.masterData).toEqual('thing');
		});
	});

});
