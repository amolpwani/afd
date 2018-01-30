'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppListComponentsModule
		 * @name DeleteListModalInstanceController
		 * @description
		 * This controller is mainly responsible for all booking  deletion related operations
		 * @requires $uibModalInstance
		 * @requires lists
		 *
		 */
angular.module('AfdUiAppListComponentsModule')
	.controller('DeleteListModalInstanceController', ['$uibModalInstance', 'lists', function ($uibModalInstance, lists) {

		//noinspection JSValidateJSDoc
        /**
		 * @ngdoc property
		 * @name lists
		 * @propertyOf DeleteListModalInstanceController
		 * @description Holds the lists in an array
		 * @type {array}
		 */

	this.lists = lists;

		/**
		 * @ngdoc method
		 * @name resolve
		 * @methodOf DeleteListModalInstanceController
		 * @description The method is to close the model instance object
		 */

	this.resolve = function () {
		$uibModalInstance.close();
	};

		/**
		 * @ngdoc method
		 * @name reject
		 * @methodOf DeleteListModalInstanceController
		 * @description The method is to reject the changes
		 */

	this.reject = function () {
		$uibModalInstance.dismiss();
	};
}]);
