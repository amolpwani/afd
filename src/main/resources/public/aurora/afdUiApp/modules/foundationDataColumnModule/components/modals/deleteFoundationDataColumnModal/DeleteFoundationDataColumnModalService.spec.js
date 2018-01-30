'use strict';

describe('AfdUiAppFoundationDataColumnComponentsModule DeleteFoundationDataColumnModalService:', function() {

	var DeleteFoundationDataColumnModalService, FoundationDataColumnService, $uibModal, $q, $rootScope;

	var deleteResults = [{uiColumnName: '1', success: true},{uiColumnName: '2', success: true}, {uiColumnName: '3', success: false},{uiColumnName: '4', success: false}];

	beforeEach(function() {
		// Module & Providers
		module('AfdUiAppFoundationDataColumnComponentsModule');

		inject(function($injector) {
			DeleteFoundationDataColumnModalService = $injector.get('DeleteFoundationDataColumnModalService');
			FoundationDataColumnService = $injector.get('FoundationDataColumnService');
			$uibModal = $injector.get('$uibModal');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
		});
	});

	it('defines a DeleteFoundationDataColumnModalService', function() {
		expect(DeleteFoundationDataColumnModalService).toBeDefined();
	});

	it('should have an openDeleteModal, processResultsForDisplay and deleteFoundationDataColumnsAndProcessResults function', function() {
		expect(DeleteFoundationDataColumnModalService.openDeleteModal).toBeDefined();
		expect(DeleteFoundationDataColumnModalService.processResultsForDisplay).toBeDefined();
		expect(DeleteFoundationDataColumnModalService.deleteFoundationDataColumnsAndProcessResults).toBeDefined();
	});

	describe('openDeleteModal(): ', function(){
		it('should call to $uibModal.open', function() {
			spyOn($uibModal, 'open').and.callThrough();
			DeleteFoundationDataColumnModalService.openDeleteModal();

			expect($uibModal.open).toHaveBeenCalled();
		});

		it('should return the result promise from the modal instance and chain a call to deleteFoundationDataColumnsAndProcessResults', function() {
			//need to mock the $uibModal.open object so we can control when it resolves
			spyOn($uibModal, 'open').and.returnValue({result: $q.when('testPromise')});
			spyOn(DeleteFoundationDataColumnModalService, 'deleteFoundationDataColumnsAndProcessResults');

			DeleteFoundationDataColumnModalService.openDeleteModal(['column1', 'column2']);
			$rootScope.$digest();
			expect(DeleteFoundationDataColumnModalService.deleteFoundationDataColumnsAndProcessResults).toHaveBeenCalledWith(['column1', 'column2']);
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

			var results = DeleteFoundationDataColumnModalService.processResultsForDisplay(updatedDeleteResults);

			expect(results).toEqual(resultsObj);
		});
	});

	describe('deleteFoundationDataColumnsAndProcessResults(): ', function(){
		it('should call to the deleteFoundationDataColumns function in the FoundationDataColumnService with the given list of foundationDataColumnsToDelete', function(){
			spyOn(FoundationDataColumnService, 'deleteFoundationDataColumns').and.returnValue($q.when(deleteResults));
			var foundationDataColumnsToDelete = ['1', '2'];

			DeleteFoundationDataColumnModalService.deleteFoundationDataColumnsAndProcessResults(foundationDataColumnsToDelete);

			expect(FoundationDataColumnService.deleteFoundationDataColumns).toHaveBeenCalledWith(foundationDataColumnsToDelete);
		});

		it('should call to the processResultsForDisplay function with the results of the delete call and return the processed results', function(){
			spyOn(FoundationDataColumnService, 'deleteFoundationDataColumns').and.returnValue($q.when(deleteResults));
			spyOn(DeleteFoundationDataColumnModalService, 'processResultsForDisplay');
			var foundationDataColumnsToDelete = ['1', '2'];

			DeleteFoundationDataColumnModalService.deleteFoundationDataColumnsAndProcessResults(foundationDataColumnsToDelete);
			$rootScope.$apply();
			expect(DeleteFoundationDataColumnModalService.processResultsForDisplay).toHaveBeenCalled();
		});
	});
});