'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppMasterDataItemModule
		 * @name createMasterDataItemController
		 * @description This controller mainly holds the methods and properties for masterData.
		 * @requires $state
		 * @requires MasterDataItemService
		 * @requires $stateParams
		 * */
angular.module('AfdUiAppMasterDataItemModule')
	.controller('CreateMasterDataItemController', ['$state', '$stateParams', '$location', 'MasterDataItemService', 'MasterDataItemPrototype', function($state, $stateParams, $location, MasterDataItemService, MasterDataItemPrototype) {

		/**
		 * @ngdoc property
		 * @name MasterDataItemService
		 * @name MasterDataItemPrototype
		 * @propertyOf createMasterDataItemController
		 * @type {object}
		 * @description This property holds the returning flights information.
		 */
		this.MasterDataItemService = MasterDataItemService;

		/**
		 * @ngdoc property
		 * @name masterData
		 * @propertyOf MasterDataItemService
		 * @type {object}
		 * @description This property holds the object for MasterDataItemPrototype service.
		 */
		this.masterDataItem = new MasterDataItemPrototype();

        /**
         * @ngdoc property
         * @name isEditing
         * @propertyOf ListService
         * @type {boolean}
         * @description This property holds the boolean value, by default it is set to false.
         */
        this.isEditing = MasterDataItemService.isEditing;

        if (this.isEditing) {
            this.masterDataItem = MasterDataItemService.masterDataItem;
            MasterDataItemService.isEditing = false;
        } else {
			this.masterDataItem.active = true;
		}

		/**
		 * @ngdoc method
		 * @name cancel
		 * @methodOf createMasterDataItemController
		 * @description The method cancels the masterData from the database.
		 */
		this.cancel = function() {
			$state.go('masterDataItem', {id : $stateParams.id});
		};

		/**
		 * @ngdoc property
		 * @name submitInProgress
		 * @propertyOf createMasterDataItemController
		 * @type {boolean}
		 * @description This property holds the boolean value, the default value will be set to false.
		 */
		this.submitInProgress = false;

		/**
		 * @ngdoc method
		 * @name submitMasterDataItem
		 * @methodOf createMasterDataItemController
		 * @description The method submit the masterData details to database.
		 */
		this.submitMasterDataItem = function() {
			this.submitInProgress = true;
			this.success = false;

			if(this.isEditing) {
				MasterDataItemService.updateMasterDataItem(this.masterDataItem).then(angular.bind(this, function() {
					//noinspection JSCheckFunctionSignatures
					$state.go('masterDataItem', {id : $stateParams.id});
				}), angular.bind(this, function(errorObj) {
					if(errorObj.updatedMasterDataItem) {
						this.masterDataItem = errorObj.updatedMasterDataItem;
					}

					this.submitInProgress = false;
				}));
			} else {
				this.masterDataItem.parentMasterDataId = $stateParams.id;
				MasterDataItemService.createMasterDataItem(this.masterDataItem).then(function() {
						//noinspection JSCheckFunctionSignatures
					$state.go('masterDataItem', {id : $stateParams.id});
				}, angular.bind(this, function() {

					this.submitInProgress = false;
				}));
			}
		};

	}]);
