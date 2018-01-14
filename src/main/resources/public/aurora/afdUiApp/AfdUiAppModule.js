'use strict';

/**
 * @ngdoc module
 * @name NewUiAppModule
 * @description The root application module
 * @requires WebCoreModule
 * @requires NewUiAppComponentsModule
 */
angular.module('NewUiAppModule', [
    'WebCoreModule', 
    'AfdUiAppComponentsModule',
    'AfdUiAppListModule',
    'AfdUiAppListComponentsModule'
]);

/*
 * Application module configuration
 */
angular.module('NewUiAppModule')
    .config(['WcTranslateConfiguratorServiceProvider', '$urlRouterProvider', '$stateProvider',
        function (WcTranslateConfiguratorServiceProvider, $urlRouterProvider, $stateProvider) {

            $stateProvider
                .state('new-ui-app', {
                    'abstract': true,
                    url: '',
                    templateUrl: 'afdUiApp/afdUiAppTemplate.html',
                    controller: 'NewUiAppController',
                    controllerAs: 'newUiAppController'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'afdUiApp/states/home/homeTemplate.html',
                    controller: 'HomeController',
                    controllerAs: 'homeController',
                    parent: 'new-ui-app'
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

            WcTranslateConfiguratorService.loadPartAndRefresh('NewUiApp');

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

