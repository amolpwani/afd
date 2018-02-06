'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppMasterDataModule
		 * @name CreateMasterDataController
		 * @description This controller mainly holds the methods and properties for list.
		 * @requires $state
		 * @requires MasterDataService
		 * @requires $stateParams
		 * */
angular.module('AfdUiAppMasterDataModule')
	.controller('CreateMasterDataController', ['$state', 'MasterDataService', 'MasterDataPrototype', function($state, MasterDataService, MasterDataPrototype) {

		/**
		 * @ngdoc property
		 * @name MasterDataService
		 * @name MasterDataPrototype
		 * @propertyOf CreateMasterDataController
		 * @type {object}
		 * @description This property holds the returning flights information.
		 */
		this.MasterDataService = MasterDataService;

		/**
		 * @ngdoc property
		 * @name list
		 * @propertyOf MasterDataService
		 * @type {object}
		 * @description This property holds the object for MasterDataPrototype service.
		 */
		this.masterData = new MasterDataPrototype();

		/**
		 * @ngdoc property
		 * @name isEditing
		 * @propertyOf MasterDataService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditing = MasterDataService.isEditing;

		if (this.isEditing) {
            this.masterData = MasterDataService.masterData;
            MasterDataService.isEditing = false;
		} else {
			this.masterData.active = true;
		}

		/**
		 * @ngdoc property
		 * @name isEditFromView
		 * @propertyOf MasterDataService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditFromView = false;
		/**
		 * @ngdoc property
		 * @name isEditFromSearchResults
		 * @propertyOf MasterDataService
		 * @type {boolean}
		 * @description This property holds the boolean value, by default it is set to false.
		 */
		this.isEditFromSearchResults = false;

		/**
		 * @ngdoc method
		 * @name cancel
		 * @methodOf CreateMasterDataController
		 * @description The method cancels the list from the database.
		 */
		this.cancel = function() {

			//noinspection JSCheckFunctionSignatures
			$state.go('masterData');
		};

		/**
		 * @ngdoc property
		 * @name submitInProgress
		 * @propertyOf CreateMasterDataController
		 * @type {boolean}
		 * @description This property holds the boolean value, the default value will be set to false.
		 */
		this.submitInProgress = false;

		/**
		 * @ngdoc method
		 * @name submitMasterData
		 * @methodOf CreateMasterDataController
		 * @description The method submit the masterData details to database.
		 */
		this.submitMasterData = function() {
			this.submitInProgress = true;
			
			if(this.isEditing) {

				MasterDataService.updateMasterData(this.masterData).then(angular.bind(this, function() {
					$state.go('masterData');
				}), angular.bind(this, function(errorObj) {
					if(errorObj.updatedMasterData) {
						this.masterData = errorObj.updatedMasterData;
					}

					this.submitInProgress = false;
				}));
			} else {
				MasterDataService.createMasterData(this.masterData).then(function() {
						//noinspection JSCheckFunctionSignatures
					$state.go('masterData');
				}, angular.bind(this, function() {

					this.submitInProgress = false;
				}));
			}
		};

	}]);
