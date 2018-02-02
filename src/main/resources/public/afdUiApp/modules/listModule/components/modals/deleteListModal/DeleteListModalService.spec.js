'use strict';

describe('AfdUiAppListComponentsModule DeleteListModalService:', function() {

	var DeleteListModalService, ListService, $uibModal, $q, $rootScope;

	var deleteResults = [{name: '1', success: true},{name: '2', success: true}, {name: '3', success: false},{name: '4', success: false}];

	beforeEach(function() {
		// Module & Providers
		module('AfdUiAppListComponentsModule');

		inject(function($injector) {
			DeleteListModalService = $injector.get('DeleteListModalService');
			ListService = $injector.get('ListService');
			$uibModal = $injector.get('$uibModal');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
		});
	});

	it('defines a DeleteListModalService', function() {
		expect(DeleteListModalService).toBeDefined();
	});

	it('should have an openDeleteModal, processResultsForDisplay and deleteListsAndProcessResults function', function() {
		expect(DeleteListModalService.openDeleteModal).toBeDefined();
		expect(DeleteListModalService.processResultsForDisplay).toBeDefined();
		expect(DeleteListModalService.deleteListsAndProcessResults).toBeDefined();
	});

	describe('openDeleteModal(): ', function(){
		it('should call to $uibModal.open', function() {
			spyOn($uibModal, 'open').and.callThrough();
			DeleteListModalService.openDeleteModal();

			expect($uibModal.open).toHaveBeenCalled();
		});

		it('should return the result promise from the modal instance and chain a call to deleteListsAndProcessResults', function() {
			//need to mock the $uibModal.open object so we can control when it resolves
			spyOn($uibModal, 'open').and.returnValue({result: $q.when('testPromise')});
			spyOn(DeleteListModalService, 'deleteListsAndProcessResults');

			DeleteListModalService.openDeleteModal(['booking1', 'booking2']);
			$rootScope.$digest();
			expect(DeleteListModalService.deleteListsAndProcessResults).toHaveBeenCalledWith(['booking1', 'booking2']);
		});
	});

	describe('processResultsForDisplay(): ', function(){
		it('should take the results array and process it into an object with a collection of successes, queued requests and failures', function(){
			var resultsObj = {
				successfulResults: [{name: '1', success: true},{name: '2', success: true}],
				failedResults: [{name: '3', success: false},{name: '4', success: false}],
				queuedResults: [{name: '5', success: 'queue'}]
			};

			var updatedDeleteResults = deleteResults.slice();
			updatedDeleteResults.push({name: '5', success: 'queue'});

			var results = DeleteListModalService.processResultsForDisplay(updatedDeleteResults);

			expect(results).toEqual(resultsObj);
		});
	});

	describe('deleteListsAndProcessResults(): ', function(){
		it('should call to the deleteLists function in the ListService with the given list of listsToDelete', function(){
			spyOn(ListService, 'deleteLists').and.returnValue($q.when(deleteResults));
			var listsToDelete = ['1', '2'];

			DeleteListModalService.deleteListsAndProcessResults(listsToDelete);

			expect(ListService.deleteLists).toHaveBeenCalledWith(listsToDelete);
		});

		it('should call to the processResultsForDisplay function with the results of the delete call and return the processed results', function(){
			spyOn(ListService, 'deleteLists').and.returnValue($q.when(deleteResults));
			spyOn(DeleteListModalService, 'processResultsForDisplay');
			var listsToDelete = ['1', '2'];

			DeleteListModalService.deleteListsAndProcessResults(listsToDelete);
			$rootScope.$apply();
			expect(DeleteListModalService.processResultsForDisplay).toHaveBeenCalled();
		});
	});
});