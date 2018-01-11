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
    'NewUiAppComponentsModule',
    'NewUiAppNewAdminModule'
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
                    templateUrl: 'newUiApp/newUiAppTemplate.html',
                    controller: 'NewUiAppController',
                    controllerAs: 'newUiAppController'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'newUiApp/states/home/homeTemplate.html',
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

            WcHttpRequestService.configureDefaults({baseUrl: '/NewAppWeb/api/'});

            WcTranslateConfiguratorService.loadPartAndRefresh('NewUiApp');

            // Enable Webtrends for App
            WcWebtrendsService.enable();

        }]);

