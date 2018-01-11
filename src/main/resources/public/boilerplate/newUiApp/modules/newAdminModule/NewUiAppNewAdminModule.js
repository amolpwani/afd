'use strict';

/**
 * @ngdoc module
 * @name NewUiAppNewAdminModule
 * @description The new Admin module
 * @requires WebCoreModule
 * @requires NewUiAppNewAdminComponentsModule
 */
angular.module('NewUiAppNewAdminModule', [
	'WebCoreModule',
	'NewUiAppNewAdminComponentsModule',
	'ngResource'
]);

/*
 * New Admin module configuration
 */
angular.module('NewUiAppNewAdminModule')
	.config(['$stateProvider',
		function ($stateProvider) {

			$stateProvider
				.state('admin-menu-item', {
					url: '/admin-menu-item',
					templateUrl: 'newUiApp/modules/newAdminModule/states/listScreen/ListScreenTemplate.html',
					controller: 'ListScreenController',
					controllerAs: 'listScreenController',
					parent: 'new-ui-app'
				}).state('new-list-item', {
					url: '/new-list-item',
					templateUrl: 'newUiApp/modules/newAdminModule/states/listScreen/NewListScreenTemplate.html',
					controller: 'ListScreenController',
					controllerAs: 'listScreenController',
					parent: 'new-ui-app'
				});
		}
	]);

