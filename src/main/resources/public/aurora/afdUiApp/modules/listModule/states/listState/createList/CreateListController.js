'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppListModule
		 * @name CreateListController
		 * @description This controller mainly holds the methods and properties for list.
		 * @requires $state
		 * @requires ListService
		 * @requires $stateParams
		 * */
angular.module('AfdUiAppListModule')
	.controller('CreateListController', ['$state', 'ListService', 'ListPrototype', function($state, ListService, ListPrototype) {

		/**
		 * @ngdoc property
		 * @name ListService
		 * @name ListPrototype
		 * @propertyOf CreateListController
		 * @type {object}
		 * @description This property holds the returning flights information.
		 */
		this.ListService = ListService;

		/**
		 * @ngdoc property
		 * @name list
		 * @propertyOf ListService
		 * @type {object}
		 * @description This property holds the object for ListPrototype service.
		 */
		this.list = new ListPrototype();

		/**
		 * @ngdoc property
		 * @name isEditing
		 * @propertyOf ListService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditing = ListService.isEditing;

		if (this.isEditing) {
            this.list = ListService.list;
            ListService.isEditing = false;
		}

		/**
		 * @ngdoc property
		 * @name isEditFromView
		 * @propertyOf ListService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditFromView = false;
		/**
		 * @ngdoc property
		 * @name isEditFromSearchResults
		 * @propertyOf ListService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditFromSearchResults = false;

		/**
		 * @ngdoc method
		 * @name cancel
		 * @methodOf CreateListController
		 * @description The method cancels the list from the database.
		 */
		this.cancel = function() {

			//noinspection JSCheckFunctionSignatures
			$state.go('list');
		};

		/**
		 * @ngdoc property
		 * @name submitInProgress
		 * @propertyOf CreateListController
		 * @type {boolean}
		 * @description This property holds the boolean value, the default value will be set to false.
		 */
		this.submitInProgress = false;

		/**
		 * @ngdoc method
		 * @name submitList
		 * @methodOf CreateListController
		 * @description The method submit the list details to database.
		 */
		this.submitList = function(createListForm) {
			if (createListForm.$valid) {
				this.submitInProgress = true;
				if(this.isEditing) {
	
					ListService.updateList(this.list).then(angular.bind(this, function() {
						$state.go('list');
					}), angular.bind(this, function(errorObj) {
						if(errorObj.updatedList) {
							this.list = errorObj.updatedList;
						}
	
						this.submitInProgress = false;
					}));
				} else {
					ListService.createList(this.list).then(function() {
							//noinspection JSCheckFunctionSignatures
						$state.go('list');
					}, angular.bind(this, function() {
	
						this.submitInProgress = false;
					}));
				}
			}
		};

	}]);
