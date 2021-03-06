'use strict';

/**
 * @ngdoc controller
 * @module AfdUiAppModule
 * @name HomeController
 * @description
 * The HomeController is the starting point of the application, when the application starts this controller will be called first.
 */
angular.module('AfdUiAppModule')
.controller('HomeController', function ($scope) {
    $scope.selectables = [
		/*{
            label: 'Otimus', value: '../../webCore/assets/image/opt.jpg'
		},*/
		{
			label: 'Aurora Optimus', value: '../webCore/assets/image/AurOpt.jpg'
		},
        {
            label: 'X-Files', value: '../webCore/assets/image/ArleenePic.jpg'
        }
	];
});