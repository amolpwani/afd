'use strict';

//noinspection JSValidateJSDoc
/**
			 * @ngdoc controller
			 * @module AfdUiAppFoundationDataColumnModule
			 * @name FoundationDataColumnController
			 * @description This controller holds the methods and properties for foundationDataColumns.
			 * @requires FoundationDataColumnService
			 * @requires $filter
			 * @requires foundationDataColumns
			 * @requires $scope
			 * @requires WcAlertConsoleService
			 * @requires $translate
			 * @requires $state
			 * @requires WcDataTableService
			 * @requires $timeout
			 * */
angular.module('AfdUiAppFoundationDataColumnModule')
	.controller('FoundationDataColumnController', ['foundationDataColumns', '$scope', 'WcAlertConsoleService', '$translate', '$state',
		function(foundationDataColumns, $scope, WcAlertConsoleService, $translate, $state) {

			//noinspection JSValidateJSDoc
            /**
			 * @ngdoc property
			 * @name foundationDataColumns
			 * @propertyOf FoundationDataColumnController
			 * @type {array}
			 * @description This property holds the foundationDataColumn of foundationDataColumns.
			 */
			this.foundationDataColumns = foundationDataColumns;

			/**
			 * @ngdoc method
			 * @name getSelectedFoundationDataColumnObjects
			 * @methodOf FoundationDataColumnController
			 * @params {integer} id
			 * @returns {object} selectedFoundationDataColumns
			 * @description Helper function to use in tandem with the datatable selection api.
			 */
			this.getSelectedFoundationDataColumnObjects = function(id) {
				var selectedId = id;
				if(selectedId === undefined) {
					selectedId = this.foundationDataColumnsToDelete;
				}
				else { //noinspection NodeModulesDependencies
					if(!angular.isArray(selectedId)) {
                        selectedId = [].concat(selectedId);
                    }
				}
				var selectedFoundationDataColumns = [];
				angular.forEach(this.foundationDataColumns, function(foundationDataColumn) {
					for(var i = 0; i < selectedId.length; i++) {
						if(foundationDataColumn.id === selectedId[i]) {
							selectedFoundationDataColumns.push(foundationDataColumn);
						}
					}
				});

				return selectedFoundationDataColumns;
			};

			$scope.$on("update-foundationDataColumn", angular.bind(this, function(event, data) { // jshint ignore:line

				this.updateFoundationDataColumn(this.getSelectedFoundationDataColumnObjects(data)[0]);
			}));

			$scope.$on("delete-foundationDataColumns", angular.bind(this, function(event, data) { // jshint ignore:line

				this.deleteFoundationDataColumns(this.getSelectedFoundationDataColumnObjects(data));
			}));

			/**
			 * @ngdoc method
			 * @name getSelectedFoundationDataColumnObjects
			 * @methodOf FoundationDataColumnController
			 * @params {string} updateType
			 * @params {string} selectedFoundationDataColumn
			 * @description The method updates the foundationDataColumn details to database based on updateType and selectedFoundationDataColumn.
			 */
			this.updateFoundationDataColumn = function(selectedFoundationDataColumn) {
				FoundationDataColumnService.isEditing = true;
                FoundationDataColumnService.foundationDataColumn = selectedFoundationDataColumn;
				$state.go('create-foundationDataColumn');
			};
			
			/**
			 * @ngdoc method
			 * @name processResultsForDisplay
			 * @methodOf DeleteBookingModalService
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
			
			/**
			 * @ngdoc method
			 * @name deleteFoundationDataColumnsAndProcessResults
			 * @methodOf FoundationDataColumnService
			 * @params {object} foundationDataColumnsToDelete
			 * @description This method is to delete the bookings and processed deleted results
			 */
			this.deleteFoundationDataColumnsAndProcessResults = function(foundationDataColumnsToDelete) {
				return FoundationDataColumnService.deleteFoundationDataColumns(foundationDataColumnsToDelete).then(angular.bind(this, function(results) {

					return this.processResultsForDisplay(results);
				}));
			};

			/**
			 * @ngdoc method
			 * @name deleteFoundationDataColumns
			 * @methodOf FoundationDataColumnController
			 * @params {object} foundationDataColumns
			 * @description This method is for delete the foundationDataColumn from database
			 */
			this.deleteFoundationDataColumns = function(foundationDataColumns) {
				return this.deleteFoundationDataColumnsAndProcessResults(foundationDataColumns).then(angular.bind(this, function(results) {

					$scope.$parent.newUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
				}));
				return null;
			};
			/**
			 * @ngdoc method
			 * @name processAndDisplayDeletionResults
			 * @methodOf FoundationDataColumnController
			 * @params {object} results
			 * @description This method is to process and display the deleted results
			 */
			this.processAndDisplayDeletionResults = function(results) {
				var createDisplayStr = function(array) {
					var displayStr = '';
					for(var i = 0; i < array.length; i++) {
						displayStr += array[i].name;
						if(i != array.length - 1) {
							displayStr += ', ';
						}
					}
					return displayStr;
				};

				if(results.successfulResults.length) {
					WcAlertConsoleService.addMessage({
						message: results.successfulResults.length + ' foundationDataColumn(s) were deleted. [' + createDisplayStr(results.successfulResults) + ']',
						type: 'success',
						multiple: false,
                        timeout: 15
					});
				}
				if(results.queuedResults.length) {
					WcAlertConsoleService.addMessage({
						message: results.queuedResults.length + ' foundationDataColumn(s) queued for deletion when network connectivity is restored. [' + createDisplayStr(results.queuedResults) + ']',
						type: 'success',
						multiple: false,
                        timeout: 15
					});
				}
				if(results.failedResults.length) {
					WcAlertConsoleService.addMessage({
						message: results.failedResults.length + ' foundationDataColumn(s) failed to be deleted. [' + createDisplayStr(results.failedResults) + ']',
						type: 'danger',
						multiple: false
					});
				}
			};
		}
	]);
