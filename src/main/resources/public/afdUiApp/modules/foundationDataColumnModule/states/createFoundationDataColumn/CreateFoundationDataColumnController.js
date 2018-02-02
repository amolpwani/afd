'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppFoundationDataColumnModule
		 * @name CreateFoundationDataColumnController
		 * @description This controller mainly holds the methods and properties for foundationDataColumn.
		 * @requires $state
		 * @requires FoundationDataColumnService
		 * @requires FoundationDataColumnPrototype
		 * @requires ListService
		 * @requires $stateParams
		 * */
angular.module('AfdUiAppFoundationDataColumnModule')
	.controller('CreateFoundationDataColumnController', ['$scope', '$state', 'FoundationDataColumnService', 'foundationDataColumns', 'WcAlertConsoleService', 'ListService', 'lists', 'FoundationDataColumnPrototype', '$translate',
		function($scope, $state, FoundationDataColumnService, foundationDataColumns, WcAlertConsoleService, ListService, lists, FoundationDataColumnPrototype, $translate) {

		/**
		 * @ngdoc property
		 * @name FoundationDataColumnService
		 * @name FoundationDataColumnPrototype
		 * @propertyOf CreateFoundationDataColumnController
		 * @type {object}
		 * @description This property holds the returning flights information.
		 */
		this.FoundationDataColumnService = FoundationDataColumnService;

		/**
		 * @ngdoc property
		 * @name foundationDataColumn
		 * @propertyOf FoundationDataColumnService
		 * @type {object}
		 * @description This property holds the object for FoundationDataColumnPrototype service.
		 */
		this.foundationDataColumn = new FoundationDataColumnPrototype();
		
		this.foundationDataColumns = foundationDataColumns;
		
		/**
		 * Input types which will used for creation of Foundational column.
		 */
		this.inputTypes = ['List', 'Text', 'TextArea'];
		
		this.activeLists = lists.filter(function (list) {
		    return (list.active == true);
		});

		/**
		 * @ngdoc property
		 * @name isEditing
		 * @propertyOf FoundationDataColumnService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditing = FoundationDataColumnService.isEditing;
		
		if (this.isEditing) {
            this.foundationDataColumn = FoundationDataColumnService.foundationDataColumn;
            FoundationDataColumnService.isEditing = false;
		} else {
			this.foundationDataColumn.active = true;
		}
		
		/**
		 * @ngdoc property
		 * @name isEditFromView
		 * @propertyOf FoundationDataColumnService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditFromView = false;
		/**
		 * @ngdoc property
		 * @name isEditFromSearchResults
		 * @propertyOf FoundationDataColumnService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditFromSearchResults = false;
		
		this.initValue = function() {
			this.foundationDataColumn.value = '';
			this.foundationDataColumn.length = 0;
		};

		/**
		 * @ngdoc method
		 * @name cancel
		 * @methodOf CreateFoundationDataColumnController
		 * @description The method cancels the foundationDataColumn from the database.
		 */
		this.cancel = function() {

			//noinspection JSCheckFunctionSignatures
			$state.go('foundationDataColumn');
		};

		/**
		 * @ngdoc property
		 * @name submitInProgress
		 * @propertyOf CreateFoundationDataColumnController
		 * @type {boolean}
		 * @description This property holds the boolean value, the default value will be set to false.
		 */
		this.submitInProgress = false;

		/**
		 * @ngdoc method
		 * @name submitFoundationDataColumn
		 * @methodOf CreateFoundationDataColumnController
		 * @description The method submit the foundationDataColumn details to database.
		 */
		this.submitFoundationDataColumn = function() {
			this.submitInProgress = true;
			var foundationColumn = this.foundationDataColumn;
			
			if (foundationColumn.inputType === 'List') {
				foundationColumn.value = '';
				foundationColumn.length = 0;
			}
			var duplicateColumn = false;
			
			angular.forEach(this.foundationDataColumns, function(column) {
				if (column.id != foundationColumn.id
						&& column.uiColumnName === foundationColumn.uiColumnName) {
					duplicateColumn = true;
					WcAlertConsoleService.addMessage({
						message: $translate.instant('foundationDataColumn.createFoundationDataColumn.duplicateUIColumn', {
							name: column.uiColumnName
						}),
						type: 'danger',
						multiple: false
					});
				}
			});
			
			if (!duplicateColumn) {
				if(this.isEditing) {
	
					FoundationDataColumnService.updateFoundationDataColumn(foundationColumn).then(angular.bind(this, function() {
						$state.go('foundationDataColumn');
					}), angular.bind(this, function(errorObj) {
						if(errorObj.updatedFoundationDataColumn) {
							this.foundationDataColumn = errorObj.updatedFoundationDataColumn;
						}
	
						this.submitInProgress = false;
					}));
				} else {
					FoundationDataColumnService.createFoundationDataColumn(foundationColumn).then(function() {
							//noinspection JSCheckFunctionSignatures
						$state.go('foundationDataColumn');
					}, angular.bind(this, function() {
	
						this.submitInProgress = false;
					}));
				}
			}
		};

	}]);
