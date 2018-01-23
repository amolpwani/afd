'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppListItemModule
		 * @name createListItemController
		 * @description This controller mainly holds the methods and properties for list.
		 * @requires $state
		 * @requires ListItemService
		 * @requires $stateParams
		 * */
angular.module('AfdUiAppListItemModule')
	.controller('CreateListItemController', ['$state', '$stateParams', '$location', 'ListItemService', 'ListItemPrototype', function($state, $stateParams, $location, ListItemService, ListItemPrototype) {

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
         * @propertyOf ListService
         * @type {boolean}
         * @description This property holds the boolean value, by default it is set to false.
         */
        this.isEditing = ListItemService.isEditing;

        if (this.isEditing) {
            this.listItem = ListItemService.listItem;
            ListItemService.isEditing = false;
        } else {
			this.listItem.active = true;
		}

		/**
		 * @ngdoc method
		 * @name cancel
		 * @methodOf createListItemController
		 * @description The method cancels the list from the database.
		 */
		this.cancel = function() {
			$state.go('listItem', {id : $stateParams.id});
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
		this.submitListItem = function(createListItemForm) {
			if (createListItemForm.$valid) {
				this.submitInProgress = true;
				this.success = false;

				if(this.isEditing) {
					ListItemService.updateListItem(this.listItem).then(angular.bind(this, function() {
						//noinspection JSCheckFunctionSignatures
						$state.go('listItem', {id : $stateParams.id});
					}), angular.bind(this, function(errorObj) {
						if(errorObj.updatedListItem) {
							this.listItem = errorObj.updatedListItem;
						}
	
						this.submitInProgress = false;
					}));
				} else {
					this.listItem.parentlistId = $stateParams.id;
					ListItemService.createListItem(this.listItem).then(function() {
							//noinspection JSCheckFunctionSignatures
						$state.go('listItem', {id : $stateParams.id});
					}, angular.bind(this, function() {
	
						this.submitInProgress = false;
					}));
				}
			}
		};

	}]);
