'use strict';

describe('AfdUiAppComponentsModule DeleteModalService:', function() {

	var DeleteModalService, FoundationDataColumnService, MasterDataItemService, MasterDataService, FoundationDataRowService, $uibModal, $q, $rootScope;

	var deleteResults = [{uiColumnName: '1', success: true},{uiColumnName: '2', success: true}, {uiColumnName: '3', success: false},{uiColumnName: '4', success: false}];

	beforeEach(function() {
		// Module & Providers
		module('AfdUiAppComponentsModule');
		module('AfdUiAppFoundationDataColumnModule');
		module('AfdUiAppFoundationDataRowModule');
		module('AfdUiAppMasterDataItemModule');
		module('AfdUiAppMasterDataModule');

		inject(function($injector) {
			DeleteModalService = $injector.get('DeleteModalService');
			FoundationDataColumnService = $injector.get('FoundationDataColumnService');
			MasterDataItemService = $injector.get('MasterDataItemService');
			MasterDataService = $injector.get('MasterDataService');
			FoundationDataRowService = $injector.get('FoundationDataRowService');
			$uibModal = $injector.get('$uibModal');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
		});
	});

	it('defines a DeleteModalService', function() {
		expect(DeleteModalService).toBeDefined();
	});

	it('should have an openDeleteModal, processResultsForDisplay and deleteAndProcessResults function', function() {
		expect(DeleteModalService.openDeleteModal).toBeDefined();
		expect(DeleteModalService.processResultsForDisplay).toBeDefined();
		expect(DeleteModalService.deleteAndProcessResults).toBeDefined();
	});

	describe('openDeleteModal(): ', function(){
		it('should call to $uibModal.open', function() {
			spyOn($uibModal, 'open').and.callThrough();
			DeleteModalService.openDeleteModal();

			expect($uibModal.open).toHaveBeenCalled();
		});

		it('should return the result promise from the modal instance and chain a call to deleteAndProcessResults', function() {
			//need to mock the $uibModal.open object so we can control when it resolves
			spyOn($uibModal, 'open').and.returnValue({result: $q.when('testPromise')});
			spyOn(DeleteModalService, 'deleteAndProcessResults');

			DeleteModalService.openDeleteModal(['column1', 'column2'], 'MasterData');
			$rootScope.$digest();
			expect(DeleteModalService.deleteAndProcessResults).toHaveBeenCalledWith(['column1', 'column2'], 'MasterData');
		});
	});

	describe('processResultsForDisplay(): ', function(){
		it('should take the results array and process it into an object with a collection of successes, queued requests and failures', function(){
			var resultsObj = {
				successfulResults: [{uiColumnName: '1', success: true},{uiColumnName: '2', success: true}],
				failedResults: [{uiColumnName: '3', success: false},{uiColumnName: '4', success: false}],
				queuedResults: [{uiColumnName: '5', success: 'queue'}]
			};

			var updatedDeleteResults = deleteResults.slice();
			updatedDeleteResults.push({uiColumnName: '5', success: 'queue'});

			var results = DeleteModalService.processResultsForDisplay(updatedDeleteResults);

			expect(results).toEqual(resultsObj);
		});
	});

	describe('deleteAndProcessResults(): ', function(){
		it('should call to the processResultsForDisplay function with the results of the delete call and return the processed results', function(){
			spyOn(FoundationDataColumnService, 'deleteFoundationDataColumns').and.returnValue($q.when(deleteResults));
			spyOn(DeleteModalService, 'processResultsForDisplay');
			var foundationDataColumnsToDelete = ['1', '2'];

			DeleteModalService.deleteAndProcessResults(foundationDataColumnsToDelete, 'FoundationDataColumn');
			$rootScope.$apply();
			expect(DeleteModalService.processResultsForDisplay).toHaveBeenCalled();
		});
	});
});