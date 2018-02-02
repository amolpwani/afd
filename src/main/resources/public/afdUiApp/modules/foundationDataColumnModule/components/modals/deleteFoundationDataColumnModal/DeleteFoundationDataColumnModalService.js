'use strict';


//noinspection JSValidateJSDoc
/**
		 * @ngdoc service
		 * @module AfdUiAppFoundationDataColumnComponentsModule
		 * @name DeleteFoundationDataColumnModalService
		 * @description
		 * This service holds all the listItem deletion related operation
		 * @requires FoundationDataColumnService
		 * @requires $uibModal
		 * */
angular.module('AfdUiAppFoundationDataColumnComponentsModule')
	.service('DeleteFoundationDataColumnModalService', ['FoundationDataColumnService', '$uibModal', function(FoundationDataColumnService, $uibModal) {

		/**
		 * @ngdoc method
		 * @name openDeleteModal
		 * @methodOf DeleteFoundationDataColumnModalService
		 * @params {object} foundationDataColumnsToDelete
		 * @description This method opens a delete list dialog box.
		 */
		this.openDeleteModal = function(foundationDataColumnsToDelete) {

			var deleteModalInstance = $uibModal.open({
				templateUrl: './afdUiApp/modules/foundationDataColumnModule/components/modals/deleteFoundationDataColumnModal/deleteFoundationDataColumnModalTemplate.html',
				controller: 'DeleteFoundationDataColumnModalInstanceController as deleteFoundationDataColumnModalInstanceController',
				resolve: {
					foundationDataColumns: function() {
						return foundationDataColumnsToDelete;
					}
				}
			});

			return deleteModalInstance.result.then(angular.bind(this, function() {

				return this.deleteFoundationDataColumnsAndProcessResults(foundationDataColumnsToDelete);
			}));
		};

		/**
		 * @ngdoc method
		 * @name deleteFoundationDataColumnsAndProcessResults
		 * @methodOf DeleteFoundationDataColumnModalService
		 * @params {object} foundationDataColumnsToDelete
		 * @description This method is to delete the foundationDataColumns and processed deleted results
		 */
		this.deleteFoundationDataColumnsAndProcessResults = function(foundationDataColumnsToDelete) {
			return FoundationDataColumnService.deleteFoundationDataColumns(foundationDataColumnsToDelete).then(angular.bind(this, function(results) {

				return this.processResultsForDisplay(results);
			}));
		};

		/**
		 * @ngdoc method
		 * @name processResultsForDisplay
		 * @methodOf DeleteFoundationDataColumnModalService
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
