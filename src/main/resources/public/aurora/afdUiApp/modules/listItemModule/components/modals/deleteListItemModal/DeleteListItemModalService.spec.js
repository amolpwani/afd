'use strict';

describe('AfdUiAppListItemComponentsModule DeleteListItemModalService:', function() {

	var DeleteListItemModalService, ListItemService, $uibModal, $q, $rootScope;

	var deleteResults = [{code: '1', success: true},{code: '2', success: true}, {code: '3', success: false},{code: '4', success: false}];

	beforeEach(function() {
		// Module & Providers
		module('AfdUiAppListItemComponentsModule');

		inject(function($injector) {
			DeleteListItemModalService = $injector.get('DeleteListItemModalService');
			ListItemService = $injector.get('ListItemService');
			$uibModal = $injector.get('$uibModal');
			$q = $injector.get('$q');
			$rootScope = $injector.get('$rootScope');
		});
	});

	it('defines a DeleteListItemModalService', function() {
		expect(DeleteListItemModalService).toBeDefined();
	});

	it('should have an openDeleteModal, processResultsForDisplay and deleteListItemsAndProcessResults function', function() {
		expect(DeleteListItemModalService.openDeleteModal).toBeDefined();
		expect(DeleteListItemModalService.processResultsForDisplay).toBeDefined();
		expect(DeleteListItemModalService.deleteListItemsAndProcessResults).toBeDefined();
	});

	describe('openDeleteModal(): ', function(){
		it('should call to $uibModal.open', function() {
			spyOn($uibModal, 'open').and.callThrough();
			DeleteListItemModalService.openDeleteModal();

			expect($uibModal.open).toHaveBeenCalled();
		});

		it('should return the result promise from the modal instance and chain a call to deleteListItemsAndProcessResults', function() {
			//need to mock the $uibModal.open object so we can control when it resolves
			spyOn($uibModal, 'open').and.returnValue({result: $q.when('testPromise')});
			spyOn(DeleteListItemModalService, 'deleteListItemsAndProcessResults');

			DeleteListItemModalService.openDeleteModal(['listItem1', 'listItem2']);
			$rootScope.$digest();
			expect(DeleteListItemModalService.deleteListItemsAndProcessResults).toHaveBeenCalledWith(['listItem1', 'listItem2']);
		});
	});

	describe('processResultsForDisplay(): ', function(){
		it('should take the results array and process it into an object with a collection of successes, queued requests and failures', function(){
			var resultsObj = {
				successfulResults: [{code: '1', success: true},{code: '2', success: true}],
				failedResults: [{code: '3', success: false},{code: '4', success: false}],
				queuedResults: [{code: '5', success: 'queue'}]
			};

			var updatedDeleteResults = deleteResults.slice();
			updatedDeleteResults.push({code: '5', success: 'queue'});

			var results = DeleteListItemModalService.processResultsForDisplay(updatedDeleteResults);

			expect(results).toEqual(resultsObj);
		});
	});

	describe('deleteListItemsAndProcessResults(): ', function(){
		it('should call to the deleteListItems function in the ListItemService with the given list of listsToDelete', function(){
			spyOn(ListItemService, 'deleteListItems').and.returnValue($q.when(deleteResults));
			var listsToDelete = ['1', '2'];

			DeleteListItemModalService.deleteListItemsAndProcessResults(listsToDelete);

			expect(ListItemService.deleteListItems).toHaveBeenCalledWith(listsToDelete);
		});

		it('should call to the processResultsForDisplay function with the results of the delete call and return the processed results', function(){
			spyOn(ListItemService, 'deleteListItems').and.returnValue($q.when(deleteResults));
			spyOn(DeleteListItemModalService, 'processResultsForDisplay');
			var listsToDelete = ['1', '2'];

			DeleteListItemModalService.deleteListItemsAndProcessResults(listsToDelete);
			$rootScope.$apply();
			expect(DeleteListItemModalService.processResultsForDisplay).toHaveBeenCalled();
		});
	});
});