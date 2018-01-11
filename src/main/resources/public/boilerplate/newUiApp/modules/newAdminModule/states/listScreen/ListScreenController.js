/**
 * @ngdoc controller
 * @module NewUiAppNewAdminModule
 * @name HomeController
 * @description
 * The HomeController is the starting point of the application, when the application starts this controller will be called first.
 */

'use strict';

angular.module('NewUiAppNewAdminModule')
	.controller('ListScreenController',function($scope, $state, $stateParams, ListData) {
	      $scope.newlists = ListData.query();
	      $scope.listdata = new ListData();
	      $scope.createListData = function() {
	      $scope.listdata.$save(function() {
	      $state.go('directlists');
	      });
	   };
	  });