'use strict';

//noinspection JSValidateJSDoc
/**
		 * @ngdoc controller
		 * @module AfdUiAppComponentsModule
		 * @name DeleteModalInstanceController
		 * @description
		 * This controller is mainly responsible for all booking  deletion related operations
		 * @requires $uibModalInstance
		 * @requires records
		 *
		 */
angular.module('AfdUiAppComponentsModule')
	.controller('DeleteModalInstanceController', ['$uibModalInstance', 'records', 'typeOfRecords', 
										function ($uibModalInstance, records, typeOfRecords) {

		//noinspection JSValidateJSDoc
    /**
	 * @ngdoc property
	 * @name records
	 * @propertyOf DeleteModalInstanceController
	 * @description Holds the records in an array
	 * @type {array}
	 */
	this.records = records;
	
    /**
	 * @ngdoc property
	 * @name typeOfRecords
	 * @propertyOf DeleteModalInstanceController
	 * @description Holds the which records to be deleted.
	 * @type string
	 */
	this.typeOfRecords = typeOfRecords;

	/**
	 * @ngdoc method
	 * @name resolve
	 * @methodOf DeleteModalInstanceController
	 * @description The method is to close the model instance object
	 */

	this.resolve = function () {
		$uibModalInstance.close();
	};

	/**
	 * @ngdoc method
	 * @name reject
	 * @methodOf DeleteModalInstanceController
	 * @description The method is to reject the changes
	 */

	this.reject = function () {
		$uibModalInstance.dismiss();
	};
}]);
