'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppListModule
		 * @name createListItemController
		 * @description This controller mainly holds the methods and properties for list.
		 * @requires $state
		 * @requires ListItemService
		 * @requires $stateParams
		 * */
angular.module('AfdUiAppListModule')
	.controller('createListItemController', ['$state', 'ListItemService', 'ListItemPrototype', function($state, ListItemService, ListItemPrototype) {

		/**
		 * @ngdoc property
		 * @name ListItemService
		 * @name ListItemPrototype
		 * @propertyOf createListItemController
		 * @type {object}
		 * @description This property holds the returning flights information.
		 */
		this.ListItemService = ListItemService;

		/**
		 * @ngdoc property
		 * @name list
		 * @propertyOf ListItemService
		 * @type {object}
		 * @description This property holds the object for ListItemPrototype service.
		 */
		this.listItem = new ListItemPrototype();

		/**
		 * @ngdoc property
		 * @name isEditing
		 * @propertyOf ListItemService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditing = false;

		/**
		 * @ngdoc property
		 * @name isEditFromView
		 * @propertyOf ListItemService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditFromView = false;
		/**
		 * @ngdoc property
		 * @name isEditFromSearchResults
		 * @propertyOf ListItemService
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
		 * @methodOf createListItemController
		 * @description The method cancels the list from the database.
		 */
		this.cancel = function() {
			var param = {
				id: this.listItem.id
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
				$state.go('listItem');
			}
		};

		/**
		 * @ngdoc property
		 * @name submitInProgress
		 * @propertyOf createListItemController
		 * @type {boolean}
		 * @description This property holds the boolean value, the default value will be set to false.
		 */
		this.submitInProgress = false;

		/**
		 * @ngdoc method
		 * @name submitListItem
		 * @methodOf createListItemController
		 * @description The method submit the list details to database.
		 */
		this.submitListItem = function() {
			this.submitInProgress = true;
			if(this.isEditing) {
				var param = {
					id: this.list.id
				};

				ListItemService.updateList(this.list).then(angular.bind(this, function() {
					if(this.isEditFromView) {
						//noinspection JSCheckFunctionSignatures
						$state.go('view-list', param);
						this.isEditFromView = false;
					}
					else {
						//noinspection JSCheckFunctionSignatures
						$state.go('listItem');
					}
				}), angular.bind(this, function(errorObj) {
					if(errorObj.updatedListItem) {
						this.list = errorObj.updatedListItem;
					}

					this.submitInProgress = false;
				}));
			} else {
				ListItemService.createListItem(this.listItem).then(function() {
						//noinspection JSCheckFunctionSignatures
					$state.go('listItem');
				}, angular.bind(this, function() {

					this.submitInProgress = false;
				}));
			}
		};

	}]);
