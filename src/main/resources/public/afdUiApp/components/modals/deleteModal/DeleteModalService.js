'use strict';


//noinspection JSValidateJSDoc
/**
		 * @ngdoc service
		 * @module AfdUiAppComponentsModule
		 * @name DeleteModalService
		 * @description
		 * This service holds all the listItem deletion related operation
		 * @requires FoundationDataColumnService
		 * @requires $uibModal
		 * */
angular.module('AfdUiAppComponentsModule')
	.service('DeleteModalService', ['FoundationDataColumnService', 'MasterDataItemService', 'MasterDataService', '$uibModal', 
		function(FoundationDataColumnService, MasterDataItemService, MasterDataService, $uibModal) {

		/**
		 * @ngdoc method
		 * @name openDeleteModal
		 * @methodOf DeleteModalService
		 * @params {object} recordsToDelete
		 * @param typeOfRecordsTodelete
		 * @description This method opens a delete list dialog box.
		 */
		this.openDeleteModal = function(recordsToDelete, typeOfRecordsTodelete) {

			var deleteModalInstance = $uibModal.open({
				templateUrl: './afdUiApp/components/modals/deleteModal/deleteModalTemplate.html',
				controller: 'DeleteModalInstanceController as deleteModalInstanceController',
				resolve: {
					records: function() {
						return recordsToDelete;
					},
					typeOfRecords: function() {
						return typeOfRecordsTodelete;
					}
				}
			});

			return deleteModalInstance.result.then(angular.bind(this, function() {

				return this.deleteAndProcessResults(recordsToDelete, typeOfRecordsTodelete);
			}));
		};

		/**
		 * @ngdoc method
		 * @name deleteAndProcessResults
		 * @methodOf DeleteModalService
		 * @params {object} recordsToDelete
		 * @description This method is to delete the records and processed deleted results
		 */
		this.deleteAndProcessResults = function(recordsToDelete, typeOfRecordsTodelete) {
			
			var records = null;
			
			if (typeOfRecordsTodelete === 'FoundationDataColumn') {
				records = FoundationDataColumnService.deleteFoundationDataColumns(recordsToDelete).then(angular.bind(this, function(results) {
					return this.processResultsForDisplay(results);
				}));
			} else if (typeOfRecordsTodelete === 'MasterData') {
				records = MasterDataService.deleteMasterDatas(recordsToDelete).then(angular.bind(this, function(results) {
					return this.processResultsForDisplay(results);
				}));
			} else if (typeOfRecordsTodelete === 'MasterDataItem') {
				records = MasterDataItemService.deleteMasterDataItems(recordsToDelete).then(angular.bind(this, function(results) {
					return this.processResultsForDisplay(results);
				}));
			} 
			
			return records;
		};

		/**
		 * @ngdoc method
		 * @name processResultsForDisplay
		 * @methodOf DeleteModalService
		 * @params {object} results
		 * @description This method is to process the results for display
		 */
		this.processResultsForDisplay = function(results) {
			//take the results array and process it into an object with a collection of successes, queued requests and failures
			var successfulResults = [];
			var queuedResults = [];
			var failedResults = [];

			for(var i=0; i<results.length; i++){
				if(results[i].success === true){
					successfulResults.push(results[i]);
				}
				else if(results[i].success === 'queue') {
					queuedResults.push(results[i]);
				}
				else {
					failedResults.push(results[i]);
				}
			}
			return {'successfulResults': successfulResults, 'queuedResults': queuedResults, 'failedResults': failedResults};
		};
	}]);
