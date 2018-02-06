'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppFoundationDataRowModule
		 * @name AfdUiAppFoundationDataRowModule
		 * @description This controller mainly holds the methods and properties for foundationData.
		 * @requires $state
		 * @requires FoundationDataService
		 * @requires FoundationDataPrototype
		 * @requires ListService
		 * @requires $stateParams
		 * */
angular.module('AfdUiAppFoundationDataRowModule')
	.controller('AfdUiAppFoundationDataRowModule', ['$state', 'FoundationDataService', 'ListService', 'lists', 'FoundationDataPrototype',
		function($state, FoundationDataService, ListService, lists, FoundationDataPrototype) {

		/**
		 * @ngdoc property
		 * @name FoundationDataService
		 * @name FoundationDataPrototype
		 * @propertyOf AfdUiAppFoundationDataRowModule
		 * @type {object}
		 * @description This property holds the returning flights information.
		 */
		this.FoundationDataService = FoundationDataService;

		/**
		 * @ngdoc property
		 * @name foundationDataColumn
		 * @propertyOf FoundationDataService
		 * @type {object}
		 * @description This property holds the object for FoundationDataPrototype service.
		 */
		this.foundationDataColumn = new FoundationDataPrototype();
		
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
		 * @propertyOf FoundationDataService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditing = FoundationDataService.isEditing;

		if (this.isEditing) {
            this.foundationDataColumn = FoundationDataService.foundationDataColumn;
            FoundationDataService.isEditing = false;
		} else {
			this.foundationDataColumn.active = true;
		}
		
		/**
		 * @ngdoc property
		 * @name isEditFromView
		 * @propertyOf FoundationDataService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditFromView = false;
		/**
		 * @ngdoc property
		 * @name isEditFromSearchResults
		 * @propertyOf FoundationDataService
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
			$state.go('foundationDataColumn');
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
		 * @name submitFoundationDataColumn
		 * @methodOf AfdUiAppFoundationDataRowModule
		 * @description The method submit the foundationDataColumn details to database.
		 */
		this.submitFoundationDataColumn = function(createFoundationDataColumnForm) {
			if (createFoundationDataColumnForm.$valid) {
				this.submitInProgress = true;
				if(this.isEditing) {
	
					FoundationDataService.updateFoundationDataColumn(this.foundationDataColumn).then(angular.bind(this, function() {
						$state.go('foundationDataColumn');
					}), angular.bind(this, function(errorObj) {
						if(errorObj.updatedFoundationDataColumn) {
							this.foundationDataColumn = errorObj.updatedFoundationDataColumn;
						}
	
						this.submitInProgress = false;
					}));
				} else {
					FoundationDataService.createFoundationDataColumn(this.foundationDataColumn).then(function() {
							//noinspection JSCheckFunctionSignatures
						$state.go('foundationDataColumn');
					}, angular.bind(this, function() {
	
						this.submitInProgress = false;
					}));
				}
			}
		};

	}]);
