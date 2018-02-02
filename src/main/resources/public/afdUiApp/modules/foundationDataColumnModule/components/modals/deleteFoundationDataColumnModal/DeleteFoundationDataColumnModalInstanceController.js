'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppFoundationDataColumnComponentsModule
		 * @name DeleteFoundationDataColumnModalInstanceController
		 * @description
		 * This controller is mainly responsible for all booking  deletion related operations
		 * @requires $uibModalInstance
		 * @requires foundationDataColumns
		 *
		 */
angular.module('AfdUiAppFoundationDataColumnComponentsModule')
	.controller('DeleteFoundationDataColumnModalInstanceController', ['$uibModalInstance', 'foundationDataColumns', function ($uibModalInstance, foundationDataColumns) {

		//noinspection JSValidateJSDoc
        /**
		 * @ngdoc property
		 * @name foundationDataColumns
		 * @propertyOf DeleteFoundationDataColumnModalInstanceController
		 * @description Holds the foundationDataColumns in an array
		 * @type {array}
		 */

	this.foundationDataColumns = foundationDataColumns;

		/**
		 * @ngdoc method
		 * @name resolve
		 * @methodOf DeleteFoundationDataColumnModalInstanceController
		 * @description The method is to close the model instance object
		 */

	this.resolve = function () {
		$uibModalInstance.close();
	};

		/**
		 * @ngdoc method
		 * @name reject
		 * @methodOf DeleteFoundationDataColumnModalInstanceController
		 * @description The method is to reject the changes
		 */

	this.reject = function () {
		$uibModalInstance.dismiss();
	};
}]);
