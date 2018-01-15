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
		this.isEditing = false;

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

		//after refactor from using the service we're now getting the previous state as a stateParam. Set up vars from it here
		if($state.params.previousState == 'search-list-results') {
			this.isEditFromSearchResults = true;
			this.isEditFromView = false;
		}
		else if($state.params.previousState == 'view-list') {
			this.isEditFromSearchResults = false;
			this.isEditFromView = true;
		}
		else {
			this.isEditFromSearchResults = false;
			this.isEditFromView = false;
		}

		/**
		 * @ngdoc method
		 * @name cancel
		 * @methodOf CreateListController
		 * @description The method cancels the list from the database.
		 */
		this.cancel = function() {
			var param = {
				confirmationNumber: this.list.confirmationNumber
			};

			if(this.isEditFromView) {
				//noinspection JSCheckFunctionSignatures
				$state.go('view-list', param);
				this.isEditFromView = false;
			}
			else if (this.isEditFromSearchResults) {
				//noinspection JSCheckFunctionSignatures
				$state.go('search-list-results', param);
				this.isEditFromSearchResults = false;

			}
			else {
				//noinspection JSCheckFunctionSignatures
				$state.go('list');
			}
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
					var param = {
						id: this.list.id
					};
	
					ListService.updateList(this.list).then(angular.bind(this, function() {
						if(this.isEditFromView) {
							//noinspection JSCheckFunctionSignatures
							$state.go('view-list', param);
							this.isEditFromView = false;
						}
						else {
							//noinspection JSCheckFunctionSignatures
							$state.go('list');
						}
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
