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
		
		this.foundationDataRowObj = [];

		/**
		 * Input types which will used for creation of Foundational column.
		 */
		this.inputTypes = ['List', 'Text', 'TextArea'];
		
//		this.activeLists = lists.filter(function (list) {
//		    return (list.active == true);
//		});
//
//		/**
//		 * @ngdoc property
//		 * @name isEditing
//		 * @propertyOf FoundationDataRowService
//		 * @type {boolean}
//		 * @description This property holds the boolean value, by default it is set to false.
//		 */
//		this.isEditing = FoundationDataRowService.isEditing;
//
//		if (this.isEditing) {
//            this.foundationDataColumn = FoundationDataRowService.foundationDataColumnList;
//            FoundationDataRowService.isEditing = false;
//		} else {
//			this.foundationDataColumn.active = true;
//		}
		
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

		/**
		 * @ngdoc method
		 * @name submitFoundationDataRow
		 * @methodOf AfdUiAppFoundationDataRowModule
		 * @description The method submit the foundationDataColumn details to database.
		 */
		this.submitFoundationDataRow = function() {
			this.submitInProgress = true;
			if(this.isEditing) {

				FoundationDataRowService.updateFoundationDataRow(this.foundationDataRowObj).then(angular.bind(this, function() {
					$state.go('foundationDataRow');
				}), angular.bind(this, function(errorObj) {
					if(errorObj.updatedFoundationDataRowObj) {
						this.foundationDataColumn = errorObj.updatedFoundationDataRowObj;
					}

					this.submitInProgress = false;
				}));
			} else {
				FoundationDataRowService.createFoundationDataRow(this.foundationDataRowObj).then(function() {
						//noinspection JSCheckFunctionSignatures
					$state.go('foundationDataRow');
				}, angular.bind(this, function() {

					this.submitInProgress = false;
				}));
			}
		};

	}]);
