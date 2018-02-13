'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppFoundationDataRowModule
		 * @name CreateFoundationDataRowController
		 * @description This controller mainly holds the methods and properties for foundationData.
		 * @requires $state
		 * @requires FoundationDataRowService
		 * @requires FoundationDataPrototype
		 * @requires ListService
		 * @requires $stateParams
		 * */
angular.module('AfdUiAppFoundationDataRowModule')
	.controller('CreateFoundationDataRowController', ['$state', 'FoundationDataRowService', 'foundationDataColumnList',
		function($state, FoundationDataRowService, foundationDataColumnList) {

		/**
		 * @ngdoc property
		 * @name FoundationDataRowService
		 * @name FoundationDataPrototype
		 * @propertyOf AfdUiAppFoundationDataRowModule
		 * @type {object}
		 * @description This property holds the returning flights information.
		 */
		this.FoundationDataRowService = FoundationDataRowService;
		
		this.foundationDataColumnList = foundationDataColumnList;
		

		/**
		 * @ngdoc property
		 * @name isEditing
		 * @propertyOf FoundationDataRowService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditing = FoundationDataRowService.isEditing;

		if (this.isEditing) {
            this.foundationDataColumnList = FoundationDataRowService.foundationDataRow;
            FoundationDataRowService.isEditing = false;
		}
		
		/**
		 * @ngdoc property
		 * @name isEditFromView
		 * @propertyOf FoundationDataRowService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditFromView = false;
		/**
		 * @ngdoc property
		 * @name isEditFromSearchResults
		 * @propertyOf FoundationDataRowService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditFromSearchResults = false;
		
		this.initValue = function() {
			this.foundationDataColumn.value = '';
		};

		/**
		 * @ngdoc method
		 * @name cancel
		 * @methodOf AfdUiAppFoundationDataRowModule
		 * @description The method cancels the foundationDataColumn from the database.
		 */
		this.cancel = function() {

			//noinspection JSCheckFunctionSignatures
			$state.go('foundationDataRow');
		};

		/**
		 * @ngdoc property
		 * @name submitInProgress
		 * @propertyOf AfdUiAppFoundationDataRowModule
		 * @type {boolean}
		 * @description This property holds the boolean value, the default value will be set to false.
		 */
		this.submitInProgress = false;
		
		this.isFieldDisabled = function(foundationDataColumn) {
			return this.isEditing && !foundationDataColumn.editable;
		};
		
		this.isValueFieldDisabled = function(foundationDataColumn) {
			return (this.isEditing && !foundationDataColumn.editable) || (!this.isEditing && foundationDataColumn.uniqueColumn);
		};


		/**
		 * @ngdoc method
		 * @name submitFoundationDataRow
		 * @methodOf AfdUiAppFoundationDataRowModule
		 * @description The method submit the foundationDataColumn details to database.
		 */
		this.submitFoundationDataRow = function() {
			
			this.submitInProgress = true;
			if(this.isEditing) {

				FoundationDataRowService.updateFoundationDataRow(this.foundationDataColumnList).then(angular.bind(this, function() {
					$state.go('foundationDataRow');
				}), angular.bind(this, function(errorObj) {
					if(errorObj.updatedFoundationDataRowObj) {
						this.foundationDataColumn = errorObj.updatedFoundationDataRowObj;
					}

					this.submitInProgress = false;
				}));
			} else {
				FoundationDataRowService.createFoundationDataRow(this.foundationDataColumnList).then(function() {
						//noinspection JSCheckFunctionSignatures
					$state.go('foundationDataRow');
				}, angular.bind(this, function() {

					this.submitInProgress = false;
				}));
			}
		};

	}]);
