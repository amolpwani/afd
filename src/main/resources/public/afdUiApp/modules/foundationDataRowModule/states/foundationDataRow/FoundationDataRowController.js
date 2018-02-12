'use strict';

//noinspection JSValidateJSDoc
/**
			 * @ngdoc controller
			 * @module AfdUiAppFoundationDataRowModule
			 * @name FoundationDataRowController
			 * @description This controller holds the methods and properties for foundationDataRows.
			 * @requires FoundationDataRowService
			 * @requires $filter
			 * @requires foundationDataRows
			 * @requires $scope
			 * @requires WcAlertConsoleService
			 * @requires $translate
			 * @requires $state
			 * @requires WcDataTableService
			 * @requires $timeout
			 * */
angular.module('AfdUiAppFoundationDataRowModule')
	.controller('FoundationDataRowController', ['FoundationDataRowService', 'FoundationDataColumnService', 'foundationDataColumnList', 'foundationDataRows', 'DeleteModalService', '$scope', 'WcAlertConsoleService', '$translate', '$state',
		function(FoundationDataRowService, FoundationDataColumnService, foundationDataColumnList, foundationDataRows, DeleteModalService, $scope, WcAlertConsoleService, $translate, $state) {

			//noinspection JSValidateJSDoc
            /**
			 * @ngdoc property
			 * @name foundationDataColumnList
			 * @propertyOf FoundationDataRowController
			 * @type {array}
			 * @description This property holds the foundationDataColumn of foundationDataColumnList.
			 */
			this.foundationDataColumnList = foundationDataColumnList;
			
			this.foundationDataRows = foundationDataRows;

			/**
			 * @ngdoc method
			 * @name getSelectedFoundationDataObjects
			 * @methodOf FoundationDataRowController
			 * @params {integer} id
			 * @returns {object} selectedfoundationDataRows
			 * @description Helper function to use in tandem with the datatable selection api.
			 */
			this.getSelectedFoundationDataObjects = function(id) {
				var selectedId = id;
				var selectedfoundationDataRows = [];
				angular.forEach(this.foundationDataRows, function(foundationDataRow) {
					if(foundationDataRow[0].rowId === selectedId) {
						selectedfoundationDataRows.push(foundationDataRow);
					}
				});

				return selectedfoundationDataRows;
			};
			
			$scope.$on("update-foundationDataRow", angular.bind(this, function(event, data) { // jshint ignore:line
				if (data[0] != undefined) {
					this.updateFoundationDataRow(this.getSelectedFoundationDataObjects(data[0])[0]);
				}
			}));

			$scope.$on("delete-foundationDataRowList", angular.bind(this, function(event, data) { // jshint ignore:line
				if (data[0] != undefined) {
					return DeleteModalService.openDeleteModal(this.getSelectedFoundationDataObjects(data[0])[0][0], 'FoundationDataRow').then(angular.bind(this, function(results) {
						$scope.afdUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
					}));
				}
			}));

			/**
			 * @ngdoc method
			 * @name updateFoundationDataRow
			 * @methodOf FoundationDataRowController
			 * @params {string} selectedfoundationDataRow
			 * @description The method updates the foundationDataRow details to database based on updateType and selectedfoundationDataRow.
			 */
			this.updateFoundationDataRow = function(selectedfoundationDataRow) {
				FoundationDataRowService.isEditing = true;
                FoundationDataRowService.foundationDataRow = selectedfoundationDataRow;
				$state.go('create-foundationDataRow');
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
			 * @name deletefoundationDataRowsAndProcessResults
			 * @methodOf FoundationDataRowService
			 * @params {object} foundationDataRowsToDelete
			 * @description This method is to delete the bookings and processed deleted results
			 */
			this.deletefoundationDataRowsAndProcessResults = function(foundationDataRowsToDelete) {
				return FoundationDataRowService.deletefoundationDataRows(foundationDataRowsToDelete).then(angular.bind(this, function(results) {

					return this.processResultsForDisplay(results);
				}));
			};

			/**
			 * @ngdoc method
			 * @name deletefoundationDataRows
			 * @methodOf FoundationDataRowController
			 * @params {object} foundationDataRows
			 * @description This method is for delete the foundationDataRow from database
			 */
			this.deletefoundationDataRows = function(foundationDataRows) {
				return this.deletefoundationDataRowsAndProcessResults(foundationDataRows).then(angular.bind(this, function(results) {

					$scope.$parent.afdUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
				}));
				return null;
			};
			/**
			 * @ngdoc method
			 * @name processAndDisplayDeletionResults
			 * @methodOf FoundationDataRowController
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
						message: results.successfulResults.length + ' foundationDataRow(s) were deleted. [' + createDisplayStr(results.successfulResults) + ']',
						type: 'success',
						multiple: false,
                        timeout: 15
					});
				}
				if(results.queuedResults.length) {
					WcAlertConsoleService.addMessage({
						message: results.queuedResults.length + ' foundationDataRow(s) queued for deletion when network connectivity is restored. [' + createDisplayStr(results.queuedResults) + ']',
						type: 'success',
						multiple: false,
                        timeout: 15
					});
				}
				if(results.failedResults.length) {
					WcAlertConsoleService.addMessage({
						message: results.failedResults.length + ' foundationDataRow(s) failed to be deleted. [' + createDisplayStr(results.failedResults) + ']',
						type: 'danger',
						multiple: false
					});
				}
			};
			
			var uiColumnName = {
				name: 'Actions',
				binding: 'row.Actions',
				useNgBind: true,
				sort: {
					enabled: false
				},
				filter: {
					enabled: false,
				}
			};
			var uiColumnNames = [];
			uiColumnNames.push(uiColumnName);
			
			var simpleColumnNames  = [];
			
			angular.forEach(this.foundationDataColumnList, function(foundationDataColumn) {
				var columnName = foundationDataColumn.uiColumnName.replace(/ /g, '_');
				
				uiColumnName = {
					name: foundationDataColumn.uiColumnName,
					mandatory: foundationDataColumn.mandatory,
					id: foundationDataColumn.id,
					binding: 'row.' + columnName,
					useNgBind: true,
					sort: {
						enabled: false,
						attributes: {
							'wc-column-sort': 'columnName',
							'wc-column-sort-default': 'asc'
						}
					},
					filter: {
						enabled: true,
						label: '<label for="name" class="sr-only">' + columnName + ' Filter</label>',
						field: '<input class="form-control input-sm" id="'+ columnName +
								'" name="' + columnName + '" type="text" wc-column-filter="' + columnName + '"/>'
					}
				};
				
				uiColumnNames.push(uiColumnName);
			});
			
			
			var foundationDataColumnList = this.foundationDataColumnList;
			this.rowDataList = [];
			var tempRowDatList = [];
			angular.forEach(this.foundationDataRows, function (foundationDataRow) {
				var rowData = {};
				angular.forEach(foundationDataColumnList, function(foundationDataColumn) {
					angular.forEach(foundationDataRow, function(columnInfo) {
						if (foundationDataColumn.id == columnInfo.columnId) {
							var columnName = columnInfo.uiColumnName.replace(/ /g, '_');
							rowData[columnName] = columnInfo.columnValue;
							rowData['id'] = columnInfo.rowId;
						}
					});
				});
				
				tempRowDatList.push(rowData);
			});
			
			this.rowDataList = tempRowDatList;
			this.uiColumnNames = uiColumnNames;
		}
	]);
