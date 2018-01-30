'use strict';

describe('AfdUiAppFoundationDataColumnComponentsModule FoundationDataColumnService:', function() {

	var FoundationDataColumnService, WcHttpEndpointPrototype, $rootScope, $q, WcAlertConsoleService, $translate,
		$httpBackend, WcHttpRequestService, $state;

	var testFoundationDataColumnObject = {
		id: '1',
		uiColumnName: 'Column1',
	};

	beforeEach(function() {
		module('AfdUiAppFoundationDataColumnComponentsModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$q = $injector.get('$q');
			$translate = $injector.get('$translate');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			FoundationDataColumnService = $injector.get('FoundationDataColumnService');
			WcAlertConsoleService = $injector.get('WcAlertConsoleService');
			$httpBackend = $injector.get('$httpBackend');
			WcHttpRequestService = $injector.get('WcHttpRequestService');
			$state = $injector.get('$state');
		});

		WcHttpRequestService.configureDefaults({baseUrl: 'http://localhost:8081/'});
	});

	it('defines a FoundationDataColumnService', function() {
		expect(FoundationDataColumnService).toBeDefined();
	});

	describe('getFoundationDataColumns(): ', function() {
		it('should use the WcHttpEndpointPrototype to request a foundationDataColumn of foundationDataColumns', function() {
			var listTestData = [{uiColumnName: 'Column1'}, {uiColumnName: 'Column2'}];

			$httpBackend.whenGET('http://localhost:8081/foundationdatacolumn/getFoundationColumn').respond(200, listTestData);

			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'get').and.callThrough();

			var actualResult = null;
			FoundationDataColumnService.getFoundationDataColumns().then(function(foundationDataColumns) {
				actualResult = foundationDataColumns;
			});

			$httpBackend.flush();

			expect(FoundationDataColumnService.foundationDataColumnEndPoint.get).toHaveBeenCalledWith({cache: 'localStorage', alwaysRefresh: true});
			expect(actualResult).toEqual(listTestData);
		});

		it('should return an error if the request for list data fails', function() {
			$httpBackend.when('GET', 'unprotected/ping').respond(200, {});

			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'get').and.callFake(function() {
				return $q.reject('Error Message');
			});

			var actualResult = null;
			FoundationDataColumnService.getFoundationDataColumns().then(function() {
				console.log('This should not happen!');
			}, function(error) {
				actualResult = error;
			});

			$rootScope.$apply();

			expect(actualResult).toEqual('Error Message');
		});
	});

	describe('getFoundationDataColumn(): ', function() {
		it('should add a subroute onto the foundationDataColumnEndPoint using the passed in id', function(){
			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'subRoute').and.callThrough();

			FoundationDataColumnService.getFoundationDataColumn('123');
			//$httpBackend.flush();
			expect(FoundationDataColumnService.foundationDataColumnEndPoint.subRoute).toHaveBeenCalledWith('123');
		});

	});

	describe('deleteFoundationDataColumns(): ', function() {
		it('should loop through the passed in list of foundationDataColumns, calling the delete endpoint for each', function(){
			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var testFoundationDataColumnsToDelete = [{id: '1', uiColumnName:'Column1'}, {id: '2', uiColumnName:'Column2'}];

			FoundationDataColumnService.deleteFoundationDataColumns(testFoundationDataColumnsToDelete);

			$rootScope.$apply();

			expect(FoundationDataColumnService.foundationDataColumnEndPoint.delete).toHaveBeenCalledWith('1', {offline: 'queue'});
			expect(FoundationDataColumnService.foundationDataColumnEndPoint.delete).toHaveBeenCalledWith('2', {offline: 'queue'});
		});

		it('in the success case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'delete').and.callFake(function() {
				return $q.when('test');
			});

			var testFoundationDataColumnsToDelete = [{id: '1', uiColumnName:'Column1'}, {id: '2', uiColumnName:'Column2'}];

			FoundationDataColumnService.deleteFoundationDataColumns(testFoundationDataColumnsToDelete).then(function(results){
				expect(results).toEqual([{name:'Column1', success: true}, {name:'Column2', success: true}]);
			});

			$rootScope.$apply();
		});

		it('in the error case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'delete').and.callFake(function() {
				return $q.reject('test');
			});

			var testFoundationDataColumnsToDelete = [{id: '1', uiColumnName:'Column1'}, {id: '2', uiColumnName:'Column2'}];

			FoundationDataColumnService.deleteFoundationDataColumns(testFoundationDataColumnsToDelete).then(function(results){
				expect(results).toEqual([{name:'Column1', success: false}, {name:'Column2', success: false}]);
			});

			$rootScope.$apply();
		});

		it('in offline queue case, should return the appropriate array of deletion results wrapped in a promise object', function(){
			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'delete').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			var testFoundationDataColumnsToDelete = [{id: '1', uiColumnName:'Column1'}, {id: '2', uiColumnName:'Column2'}];

			FoundationDataColumnService.deleteFoundationDataColumns(testFoundationDataColumnsToDelete).then(function(results){
				expect(results).toEqual([{name:'Column1', success: 'queue'}, {name:'Column2', success: 'queue'}]);
			});

			$rootScope.$apply();
		});
	});

	describe('createFoundationDataColumn():', function() {

		it('should send a POST to save a foundationDataColumn, and when successful clear the list object', function() {
			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'post').and.callFake(function() {
				return $q.when({data : {name: 'test'}});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			FoundationDataColumnService.createFoundationDataColumn(testFoundationDataColumnObject);

			$rootScope.$apply();

			expect(FoundationDataColumnService.foundationDataColumnEndPoint.post).toHaveBeenCalledWith(testFoundationDataColumnObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should send a POST to save a foundationDataColumn, and when the request is queued clear the list object', function() {
			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'post').and.callFake(function() {
				return $q.when({status: 'queue'});
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			spyOn(WcAlertConsoleService, 'addMessage');

			FoundationDataColumnService.createFoundationDataColumn(testFoundationDataColumnObject);

			$rootScope.$apply();

			expect(FoundationDataColumnService.foundationDataColumnEndPoint.post).toHaveBeenCalledWith(testFoundationDataColumnObject, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});


		it('should add an error message to the message queue if the post fails, and should not clear the list object', function() {
			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'post').and.callFake(function() {
				return $q.reject('test');
			});

			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});
			spyOn(WcAlertConsoleService, 'addMessage');

			FoundationDataColumnService.createFoundationDataColumn(testFoundationDataColumnObject);

			$rootScope.$apply();

			expect(FoundationDataColumnService.foundationDataColumnEndPoint.post).toHaveBeenCalled();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'danger', multiple: false});
		});

	});

	describe('updateFoundationDataColumn():', function() {

		it('should attempt to update a foundationDataColumn and create a success alert if the request succeeds', function() {
			var testFoundationDataColumn = {name: 'Column1', id: '1'};
			var testFoundationDataColumnId = testFoundationDataColumn.id;

			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'put').and.callFake(function() {
				return $q.when({data : {name: 'test'}});
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			//update to use new function signature, passing in the booking
			FoundationDataColumnService.updateFoundationDataColumn(testFoundationDataColumn);

			$rootScope.$apply();

			delete testFoundationDataColumn.id;

			expect(FoundationDataColumnService.foundationDataColumnEndPoint.put).toHaveBeenCalledWith(testFoundationDataColumnId, testFoundationDataColumn, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test', type: 'success', multiple: false});
		});

		it('should attempt to update a foundationDataColumn and create a queued alert if the request is queued', function() {
			var testFoundationDataColumn = {uiColumnName:'Column1', id: '1'};
			var testFoundationDataColumnId = testFoundationDataColumn.id;

			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'put').and.callFake(function() {
				return $q.when('queue');
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test queue';
			});

			FoundationDataColumnService.updateFoundationDataColumn(testFoundationDataColumn);

			$rootScope.$apply();

			delete testFoundationDataColumn.id;

			expect(FoundationDataColumnService.foundationDataColumnEndPoint.put).toHaveBeenCalledWith(testFoundationDataColumnId, testFoundationDataColumn, {offline: 'queue'});
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalledWith({message: 'test queue', type: 'success', multiple: false});
		});

		it('should put a message on the screen in the error case if the status code is not 409 and should reject the promise with the error object', function(){
			var testFoundationDataColumn = {uiColumnName:'Column1', id: '1'};

			spyOn(FoundationDataColumnService.foundationDataColumnEndPoint, 'put').and.callFake(function() {
				return $q.reject({status: 'not409'});
			});
			spyOn(WcAlertConsoleService, 'addMessage');
			spyOn($translate, 'instant').and.callFake(function() {
				return 'test';
			});

			FoundationDataColumnService.updateFoundationDataColumn(testFoundationDataColumn).then(function(){}, function(error){
				expect(error).toEqual({status: 'not409'});
			});

			$rootScope.$apply();
			expect(WcAlertConsoleService.addMessage).toHaveBeenCalled();
		});
	});
});
