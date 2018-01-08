angular.module('app.controllers', []).controller('DirectListController', function($scope,$http,$rootScope,$state,$timeout, popupService, $window, ListData,ListDataItems) {
  $scope.newlists = ListData.query();
  //$scope.newitem = ListDataItems.query();
}).controller('newlist',function($scope, $state, $stateParams, ListData) {
      $scope.newlists = ListData.query();
      $scope.listdata = new ListData();
      $scope.createListData = function() {
      $scope.listdata.$save(function() {
      $state.go('directlists');
      });
   };
  }).controller('newlistitem',function($scope,$http,$rootScope,$state,$timeout,$stateParams,popupService,ListDataItems,ListData) {
      var listid=$stateParams.id;

      if(listid !=null)
      {
        $rootScope.listId=$stateParams.id;
      }

      var url = "listdata/getList/"+$rootScope.listId;
       $http.get(url).then( function(response) {
             $scope.title=response.data['name'];
       });

      $scope.newitem=[];
      var url = "listdataitems/getListId/"+$rootScope.listId;
      $http.get(url).then( function(response) {
             $scope.newitem=response.data;
      });
      //$scope.newitem = ListDataItems.query();
      $scope.listitem = new ListDataItems();
      $scope.listitem.listId=$rootScope.listId;
      console.log($scope.listitem);
      $scope.createListDataItems = function() {
      $scope.listitem.$save(function() {
      $state.go('newitem');
      }); };
    $scope.deleteListDataItemsById = function(listId) {
        if (popupService.showPopup('Do want to delete this?')) {
              console.log("Id  :"+listId.id);
              var deleteurl = "listdataitems/deleteListDataItemsById/"+listId.id;
              $http.delete(deleteurl).then( function(response) {
                 console.log(response.data);
              });
              var listurl = "listdataitems/getListId/"+$rootScope.listId;
               $timeout(function(){$http.get(listurl).then( function(response) {
                  console.log(response.data);
                  $scope.newitem=response.data;});
               },500);
              $state.go('newitem');
        }};
      }).controller('NewItemViewController', function($scope, $stateParams, ListDataItems) {
      $scope.newitem = ListDataItems.get({ id: $stateParams.id });
  }).controller('homecontroller',function($scope, $state, $stateParams, ListData) {
           $scope.title = "Volvo";
           $scope.getTitle = function (title) {
             console.log("success");
                $scope.title = title;
           }
   }).controller('updatelistitem', function($scope, $state, $stateParams, ListDataItems) {
    $scope.updateListDataItems = function() {
      $scope.newitem.$update(function() {
      $state.go('newitem');
    });
  };

  $scope.loadlistitem = function() {
    $scope.newitem = ListDataItems.get({ id: $stateParams.id });
  };
  $scope.loadlistitem();
}).controller('updatenewlist', function($scope, $state, $stateParams, ListData) {
       $scope.updateListData = function() {
         $scope.newlists.$update(function() {
         $state.go('directlists');
       });
     };
     $scope.loadnewlist = function() {
       $scope.newlists = ListData.get({ id: $stateParams.id });
     };
     $scope.loadnewlist();
   });