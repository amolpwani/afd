'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppListItemComponentsModule
		 * @name DeleteListItemModalInstanceController
		 * @description
		 * This controller is mainly responsible for all booking  deletion related operations
		 * @requires $uibModalInstance
		 * @requires listItems
		 *
		 */
angular.module('AfdUiAppListItemComponentsModule')
	.controller('DeleteListItemModalInstanceController', ['$uibModalInstance', 'listItems', function ($uibModalInstance, listItems) {

		//noinspection JSValidateJSDoc
        /**
		 * @ngdoc property
		 * @name listItems
		 * @propertyOf DeleteListItemModalInstanceController
		 * @description Holds the listItems in an array
		 * @type {array}
		 */

	this.listItems = listItems;

		/**
		 * @ngdoc method
		 * @name resolve
		 * @methodOf DeleteListItemModalInstanceController
		 * @description The method is to close the model instance object
		 */

	this.resolve = function () {
		$uibModalInstance.close();
	};

		/**
		 * @ngdoc method
		 * @name reject
		 * @methodOf DeleteListItemModalInstanceController
		 * @description The method is to reject the changes
		 */

	this.reject = function () {
		$uibModalInstance.dismiss();
	};
}]);
