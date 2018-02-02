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
	.controller('FoundationDataColumnController', ['FoundationDataColumnService', 'foundationDataColumns', 'lists', '$scope', 'DeleteFoundationDataColumnModalService', 'WcAlertConsoleService', '$translate', '$state',
		function(FoundationDataColumnService, foundationDataColumns, lists, $scope, DeleteFoundationDataColumnModalService, WcAlertConsoleService, $translate, $state) {

			//noinspection JSValidateJSDoc
            /**
			 * @ngdoc property
			 * @name foundationDataColumns
			 * @propertyOf FoundationDataColumnController
			 * @type {array}
			 * @description This property holds the foundationDataColumn of foundationDataColumns.
			 */
			this.foundationDataColumns = foundationDataColumns;
			
			var lists = lists;
			
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
			
			this.updateSelectedFoundationDataColumn = function(selectedId) {
				
				var selectedFoundationDataColumn = {};
				angular.forEach(this.foundationDataColumns, function(foundationDataColumn) {
					if(foundationDataColumn.id === selectedId) {
						selectedFoundationDataColumn = foundationDataColumn;
					}
				});
				
				FoundationDataColumnService.isEditing = true;
                FoundationDataColumnService.foundationDataColumn = selectedFoundationDataColumn;
				$state.go('create-foundationDataColumn');
			};

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
			
			this.deleteFoundationDataColumn = function(selectedId) {
				var selectedFoundationDataColumns = [];
				angular.forEach(this.foundationDataColumns, function(foundationDataColumn) {
					if(foundationDataColumn.id === selectedId) {
						selectedFoundationDataColumns.push(foundationDataColumn);
					}
				});
				
				//this.deleteFoundationDataColumns(selectedFoundationDataColumns);
				
				return DeleteFoundationDataColumnModalService.openDeleteModal(selectedFoundationDataColumns).then(angular.bind(this, function(results) {
					$scope.afdUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
				}));
			}
			
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

					$scope.$parent.afdUiAppController.reloadState(this.processAndDisplayDeletionResults, results);
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
			
			this.columnsAtrributes = [];
			var actionsJson = {};
			var uiColumnNameJson = {};
			var hoverHelpJson = {};
			var uniqueJson = {};
			var inputTypeJson = {};
			var valueJson = {};
			var mandatoryJson = {};
			var sortOrderJson = {};
			var editableJson = {};
			var lengthJson = {};
			var idJson = {};
			
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
			
			angular.forEach(this.foundationDataColumns, function(foundationDataColumn) {
				var columnName = foundationDataColumn.uiColumnName.replace(/ /g, '_');
				var selectedList = '';
				
				uiColumnName = {
					name: foundationDataColumn.uiColumnName,
					id: foundationDataColumn.id,
					binding: 'row.' + columnName,
					useNgBind: true,
					sort: {
						enabled: false,
					},
					filter: {
						enabled: false,
						label: '<label for="name" class="sr-only">' + columnName + ' Filter</label>',
						field: '<input class="form-control input-sm" id="'+ columnName +
								'" name="' + columnName + '" type="text" wc-column-filter="' + columnName + '"/>'
					}
				};
				
				uiColumnNames.push(uiColumnName);
				
				uiColumnNameJson[columnName] = foundationDataColumn.uiColumnName;
				hoverHelpJson[columnName] = foundationDataColumn.hoverHelp;
				uniqueJson[columnName] = foundationDataColumn.uniqueColumn ? 'Y' : 'N';
				if (foundationDataColumn.inputType === 'List') {
					
					angular.forEach(lists, function(list) {
						if(list.id === foundationDataColumn.selectedListId) {
							selectedList = list.description;
						}
					});
					
					inputTypeJson[columnName] = foundationDataColumn.inputType + '-' + selectedList + '-' + foundationDataColumn.listDisplayType;
				} else {
					inputTypeJson[columnName] = foundationDataColumn.inputType;
				}
				valueJson[columnName] = foundationDataColumn.value;
				mandatoryJson[columnName] = foundationDataColumn.mandatory ? 'Y' : 'N';
				sortOrderJson[columnName] = foundationDataColumn.sortOrder;
				editableJson[columnName] = foundationDataColumn.editable ? 'Y' : 'N';
				lengthJson[columnName] = foundationDataColumn.length;
			});
			
			uiColumnNameJson['Actions'] = 'UI Column Name';
			hoverHelpJson['Actions'] = 'Hover Help';
			uniqueJson['Actions'] = 'Unique Column';
			inputTypeJson['Actions'] = 'Input Type';
			valueJson['Actions'] = 'Value';
			mandatoryJson['Actions'] = 'Mandatory';
			sortOrderJson['Actions'] = 'Display Order';
			editableJson['Actions'] = 'Editable';
			lengthJson['Actions'] = 'Length';
			
			uiColumnNameJson['id'] = 1;
			hoverHelpJson['id'] = 2;
			uniqueJson['id'] = 3;
			inputTypeJson['id'] = 4;
			valueJson['id'] = 5;
			mandatoryJson['id'] = 6;
			sortOrderJson['id'] = 7;
			editableJson['id'] = 8;
			lengthJson['id'] = 9;
			
			this.columnsAtrributes.push(uiColumnNameJson);
			this.columnsAtrributes.push(hoverHelpJson);
			this.columnsAtrributes.push(uniqueJson);
			this.columnsAtrributes.push(inputTypeJson);
			this.columnsAtrributes.push(valueJson);
			this.columnsAtrributes.push(mandatoryJson);
			this.columnsAtrributes.push(sortOrderJson);
			this.columnsAtrributes.push(editableJson);
			this.columnsAtrributes.push(lengthJson);
			this.uiColumnNames = uiColumnNames;
			
		}
	]);
