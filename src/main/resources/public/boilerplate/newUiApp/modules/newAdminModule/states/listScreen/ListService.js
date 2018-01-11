angular.module("NewUiAppNewAdminModule").factory('ListData', function($resource) {
	return $resource('/listdata/getList/:id', { id: '@id' }, {
    update: {
      method: 'PUT'
    }
  });
}).service('ListDataItems', function($resource) {
   return $resource('/listdataitems/getItems/:id', { id: '@id' }, {
   update: {
       method: 'PUT'
   }
   });
});