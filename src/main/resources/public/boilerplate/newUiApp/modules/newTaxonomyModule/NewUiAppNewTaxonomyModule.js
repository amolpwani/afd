'use strict';

/**
 * @ngdoc module
 * @name NewUiAppNewTaxonomyModule
 * @description The new taxonomy module
 * @requires WebCoreModule
 * @requires NewUiAppNewTaxonomyComponentsModule
 */
angular.module('NewUiAppNewTaxonomyModule', [
	'WebCoreModule',
	'NewUiAppNewTaxonomyComponentsModule'
]);

/*
 * New Taxonomy module configuration
 */
angular.module('NewUiAppNewTaxonomyModule')
	.config(['$stateProvider',
		function ($stateProvider) {

			$stateProvider
				.state('child-menu-item', {
					url: '/child-menu-item',
					templateUrl: 'newUiApp/modules/newTaxonomyModule/states/newScreen/newScreenTemplate.html',
					controller: 'NewScreenController',
					controllerAs: 'newScreenController',
					parent: 'new-ui-app'
				});
		}
	]);

