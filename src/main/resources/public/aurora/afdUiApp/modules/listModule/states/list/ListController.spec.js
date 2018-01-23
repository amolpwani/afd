'use strict';

describe('AfdUiAppListModule ListController:', function() {

	// Dependencies
	var listController, $timeout, WcDataTableService, scope, $rootScope, $controller, WcHttpEndpointPrototype, ApplicationPolicyService, BookingService, $translate, DeleteBookingModalService, WcAlertConsoleService, $q, $httpBackend, $templateCache, $state, BookingPrototype;

	// Test data
	var bookingsData = [
			{
				uuid: '1',
				confirmationNumber: '1',
				customer: {
					lastName: 'Smith',
					firstName: 'John'
				}
			},
			{
				uuid: '2',
				confirmationNumber: '2',
				customer: {
					lastName: 'Doe',
					firstName: 'Steve'
				}
			}
		],
		userInfoMock = {
			'userInformation': 'test'
		};

	beforeEach(function() {
		module('AfdUiAppListModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			WcHttpEndpointPrototype = $injector.get('WcHttpEndpointPrototype');
			ApplicationPolicyService = $injector.get('ApplicationPolicyService');
			BookingService = $injector.get('BookingService');
			$translate = $injector.get('$translate');
			DeleteBookingModalService = $injector.get('DeleteBookingModalService');
			WcAlertConsoleService = $injector.get('WcAlertConsoleService');
			$q = $injector.get('$q');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
			$state = $injector.get('$state');
			WcDataTableService = $injector.get('WcDataTableService');
			$timeout = $injector.get('$timeout');
			BookingPrototype = $injector.get('BookingPrototype');
		});

		scope = $rootScope.$new();

		//we do not have the actual application controller available in this instance. mock out the objects and functions
		//we need on it for the tests to succeed.
		scope.$parent.jabUiAppController = {};
		scope.$parent.jabUiAppController.userInformation = userInfoMock;
		scope.$parent.jabUiAppController.reloadState = function() {
			//noinspection JSCheckFunctionSignatures
            $state.go($state.current.name, $state.params, {
				reload: true
			});
		};

		//even though we don't use these directly, since we are calling a rootScope apply for promise resolution they are needed.
		$templateCache.put('jabUiApp/modules/bookingModule/states/listBooking/listBookingTemplate.html', '');
		$httpBackend.when('GET', 'bookings').respond(200);
		$httpBackend.when('GET', 'ping/index.html').respond(200);


		listController = function() {
			$controller(
				'ListController as listController', {
					$scope: scope,
					bookings: bookingsData
				});
		};

		listController();
	});

	it('should be registered', function() {
		expect(scope.listController).toBeDefined();
	});

	it('should have bookings data', function() {
		expect(scope.listController.bookings).toEqual(bookingsData);
	});

	it('should add a fullName property to each of the booking in the list', function(){
		expect(scope.listController.bookings[0].customer.fullName).toEqual('Smith, John');
		expect(scope.listController.bookings[1].customer.fullName).toEqual('Doe, Steve');
	});

	it('should set the appropriate headerText and instructionsText for the default user role', function(){
		expect(scope.listController.headerText).toEqual('booking.listBooking.title');
		expect(scope.listController.instructionsText).toEqual('booking.listBooking.instructions');
	});

	it('should set the appropriate headerText when the role is changed and the userInformation is in a promise', function(){
		ApplicationPolicyService.userInformation.role = 'notAgent';

		scope.$parent.jabUiAppController.userInformation = $q.when(userInfoMock);

		listController();

		$rootScope.$apply();

		expect(scope.listController.headerText).toEqual('booking.listBooking.customerTitle');
		expect(scope.listController.instructionsText).toEqual('booking.listBooking.customerInstructions');
	});

	it('should set the appropriate headerText when the role is changed and the userInformation is not in a promise', function(){
		ApplicationPolicyService.userInformation.role = 'notAgent';

		listController();

		expect(scope.listController.headerText).toEqual('booking.listBooking.customerTitle');
		expect(scope.listController.instructionsText).toEqual('booking.listBooking.customerInstructions');
	});

	it('should have processAndDisplayDeletionResults, deleteBookings, viewBoking, updateBooking and getSelectedBookingObjects functions', function() {
		expect(scope.listController.processAndDisplayDeletionResults).toBeDefined();
		expect(scope.listController.deleteBookings).toBeDefined();
		expect(scope.listController.viewBooking).toBeDefined();
		expect(scope.listController.updateBooking).toBeDefined();
		expect(scope.listController.getSelectedBookingObjects).toBeDefined();
	});

	describe('processAndDisplayDeletionResults(): ', function() {
		it('should take the given results list and create the appropriate messages with the WcAlertConsoleService', function() {
			spyOn(WcAlertConsoleService, 'addMessage');

			var testObj = {
				successfulResults: [{
					confirmationNumber: '1'
				}, {
					confirmationNumber: '2'
				}],
				failedResults: [{
					confirmationNumber: '3'
				}, {
					confirmationNumber: '4'
				}],
				queuedResults: [{
					confirmationNumber: '5'
				}]
			};
			scope.listController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage.calls.count()).toEqual(3);
		});

		it('should should not add any messages if no objects are passed in', function() {
			spyOn(WcAlertConsoleService, 'addMessage');

			var testObj = {successfulResults: [], queuedResults: [], failedResults: []};
			scope.listController.processAndDisplayDeletionResults(testObj);
			expect(WcAlertConsoleService.addMessage).not.toHaveBeenCalled();
		});
	});

	//can't seem to get to the $on function in the unit test case. will have to implicitly test this code through the e2e tests
	xdescribe('table watches: ', function(){
		it('should establish the appropriate listeners to trigger booking events from the table', function(){
			spyOn(scope.listController.$scope, '$on');

			expect(scope.listController.$scope.$on.calls.count()).toEqual(4);
		});
	});

	describe('viewBooking(): ', function() {
		it('should call state.go to navigate to the view-booking state for the given data', function() {
			spyOn($state, 'go');

			scope.listController.viewBooking(bookingsData[0]);

			expect($state.go).toHaveBeenCalledWith('view-booking', {confirmationNumber: bookingsData[0].confirmationNumber});
		});
	});

	describe('updateBooking(): ', function() {
		it('should set up the BookingService', function() {
			spyOn($state, 'go');

			scope.listController.updateBooking('options', bookingsData[0]);

			expect(BookingService.isEditing).toBeTruthy();
			//expect(BookingService.booking).toEqual(new BookingPrototype(bookingsData[0]));
		});
		it('should call state.go to navigate to the select-booking-options state', function() {
			spyOn($state, 'go');

			scope.listController.updateBooking('options', bookingsData[0]);

			expect($state.go).toHaveBeenCalledWith('update-booking.select-booking-options', {confirmationNumber: bookingsData[0].confirmationNumber});
		});
		it('should call state.go to navigate to the select-departing-flight state', function() {
			spyOn($state, 'go');

			scope.listController.updateBooking('flight', bookingsData[0]);

			expect($state.go).toHaveBeenCalledWith('update-booking.select-departing-flight', {confirmationNumber: bookingsData[0].confirmationNumber});
		});
	});

	describe('deleteBookings(): ', function() {
		it('should find the confirmation number for the link that was clicked and pass it and scope through to the DeleteModalService, and on return of the promise process and display the results', function() {
			spyOn(DeleteBookingModalService, 'openDeleteModal').and.callFake(function() {
				return $q.when('done');
			});
			spyOn(scope.listController, 'processAndDisplayDeletionResults');
			spyOn(scope.$parent.jabUiAppController, 'reloadState');

			scope.listController.deleteBookings(bookingsData);

			scope.$apply();

			expect(DeleteBookingModalService.openDeleteModal).toHaveBeenCalledWith(bookingsData);
			expect(scope.$parent.jabUiAppController.reloadState).toHaveBeenCalled();
		});
	});

	describe('getSelectedBookingObjects(): ', function(){
		it('should return an array with a single booking object when given a single uuid', function() {
			var result = scope.listController.getSelectedBookingObjects('1');

			expect(result).toEqual([bookingsData[0]]);
		});
		it('should return an array of booking objects when given an array of uuids', function() {
			var result = scope.listController.getSelectedBookingObjects(['1', '2']);

			expect(result).toEqual(bookingsData);
		});
		it('should return an array of booking objects when given nothing by using the bookingsToDelete array', function() {
			scope.listController.bookingsToDelete = ['1', '2'];

			var result = scope.listController.getSelectedBookingObjects();

			expect(result).toEqual(bookingsData);
		});
	});
});
