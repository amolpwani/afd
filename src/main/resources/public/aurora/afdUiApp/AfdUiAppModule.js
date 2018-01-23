'use strict';

/**
 * @ngdoc module
 * @name AfdUiAppModule
 * @description The root application module
 * @requires WebCoreModule
 * @requires AfdUiAppComponentsModule
 * @requires AfdUiAppListModule
 * @requires AfdUiAppListComponentsModule
 * @requires AfdUiAppFoundationDataColumnModule
 * @requires AfdUiAppFoundationDataColumnComponentsModule
 */
angular.module('AfdUiAppModule', [
    'WebCoreModule', 
    'AfdUiAppComponentsModule',
    'AfdUiAppListModule',
    'AfdUiAppListItemModule',
    'AfdUiAppFoundationDataColumnModule'
]);

/*
 * Application module configuration
 */
angular.module('AfdUiAppModule')
    .config(['WcTranslateConfiguratorServiceProvider', '$urlRouterProvider', '$stateProvider',
        function (WcTranslateConfiguratorServiceProvider, $urlRouterProvider, $stateProvider) {

            $stateProvider
                .state('afd-ui-app', {
                    'abstract': true,
                    url: '',
                    templateUrl: 'afdUiApp/afdUiAppTemplate.html',
                    controller: 'AfdUiAppController',
                    controllerAs: 'afdUiAppController'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'afdUiApp/states/home/homeTemplate.html',
                    controller: 'HomeController',
                    controllerAs: 'homeController',
                    parent: 'afd-ui-app'
                });

            
            $urlRouterProvider.when('', '/home');
            $urlRouterProvider.when('/', '/home');
            $urlRouterProvider.otherwise('/');

            WcTranslateConfiguratorServiceProvider.configureTranslateService({loaderObj: {urlTemplate: '../translations/{lang}/{part}.json'},});
        }
    ])
    .run(['WcHttpRequestService', 'WcWebtrendsService', 'WcTranslateConfiguratorService',
        function(WcHttpRequestService, WcWebtrendsService, WcTranslateConfiguratorService) {

            WcHttpRequestService.configureDefaults({baseUrl: '/'});

            WcTranslateConfiguratorService.loadPartAndRefresh('AfdUiApp');

            // Enable Webtrends for App
            WcWebtrendsService.enable();
            
            //cache resources needed for list creation flow. do it here so it only happens once
//			var precacheRequests = ['ListService',
//				function(ListService){
//					ListService.getLists();
//				}];
//			
//			$injector.invoke(precacheRequests);
        }]);

