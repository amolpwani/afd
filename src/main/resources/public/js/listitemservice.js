angular.module('app.services', []).factory('ListData', function($resource) {
  return $resource('/listdata/getList/:id', { id: '@id' }, {
    update: {
      method: 'PUT'
    }
  });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});