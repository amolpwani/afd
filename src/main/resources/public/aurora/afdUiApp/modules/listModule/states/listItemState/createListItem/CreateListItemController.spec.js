'use strict';

describe('JabUiAppBookingModule CrupdateBookingController:', function() {

	// Dependencies
	var scope, $rootScope, $controller, CrupdateBookingController, createBookingForm, $compile, $state, BookingService, BookingPrototype, $q, $httpBackend, $templateCache;

	var createCrupdateController;

	var previousStateSearchMock = {
		params: {
			previousState: 'search-booking-results'
		}
	};

	var previousStateViewMock = {
		params: {
			previousState: 'view-booking'
		}
	};

	beforeEach(function(){
		module('JabUiAppBookingModule');

		inject(function($injector) {
			$rootScope = $injector.get('$rootScope');
			$controller = $injector.get('$controller');
			$compile = $injector.get('$compile');
			$state = $injector.get('$state');
			BookingService = $injector.get('BookingService');
			BookingPrototype = $injector.get('BookingPrototype');
			$q = $injector.get('$q');
			$httpBackend = $injector.get('$httpBackend');
			$templateCache = $injector.get('$templateCache');
		});


		scope = $rootScope.$new();

		createCrupdateController = function(stateMock) {
			if(!stateMock) {
				CrupdateBookingController = $controller(
					'CrupdateBookingController as crupdateBookingController', {
						$scope : scope
					});
			}
			else {
				CrupdateBookingController = $controller(
					'CrupdateBookingController as crupdateBookingController', {
						$scope : scope,
						$state : stateMock
					});
			}
		};

		createCrupdateController();

		var element = angular.element(
			'<form name="createBookingForm">' +
			'</form>'
		);

		$compile(element)(scope);

		createBookingForm = scope.createBookingForm;

		$httpBackend.when('GET','bookings').respond(200);
		$httpBackend.when('GET','jabUiApp/modules/bookingModule/states/listBooking/listBookingTemplate.html').respond(200);
		$templateCache.put('jabUiApp/modules/bookingModule/states/listBooking/listBookingTemplate.html');

	});

	it('should be registered', function() {
		expect(CrupdateBookingController).toBeDefined();
	});


	describe('booking selection storage and state management:', function() {
		it('should have an object to store values in', function() {
			expect(scope.crupdateBookingController.booking).toBeDefined();
		});

		it('should initialize the booking object to a new Booking', function() {
			var emptyBooking = new BookingPrototype();
			expect(scope.crupdateBookingController.booking).toEqual(emptyBooking);
		});

		it('should set the isEditFrom variables according to the passed in previous state:', function() {
			expect(scope.crupdateBookingController.isEditFromView).toBeFalsy();
			expect(scope.crupdateBookingController.isEditFromSearchResults).toBeFalsy();

			createCrupdateController(previousStateSearchMock);
			expect(scope.crupdateBookingController.isEditFromView).toBeFalsy();
			expect(scope.crupdateBookingController.isEditFromSearchResults).toBeTruthy();

			createCrupdateController(previousStateViewMock);
			expect(scope.crupdateBookingController.isEditFromView).toBeTruthy();
			expect(scope.crupdateBookingController.isEditFromSearchResults).toBeFalsy();
		});
	});

	describe('cancel():',function() {
		beforeEach(function() {
			spyOn($state, 'go');
		});

		it('should navigate back to list-booking if booking creation is cancelled', function(){
			scope.crupdateBookingController.cancel();

			expect($state.go).toHaveBeenCalledWith('list-booking');
		});

		it('should and navigate back to view-booking', function(){
			var confirmationNumber = '';
			var param = {
				confirmationNumber: confirmationNumber
			};
			scope.crupdateBookingController.isEditFromView = true;

			scope.crupdateBookingController.cancel();

			expect($state.go).toHaveBeenCalledWith('view-booking', param);
		});

		it('should navigate back to search-booking-results', function(){
			var confirmationNumber = '';
			var param = {
				confirmationNumber: confirmationNumber
			};
			scope.crupdateBookingController.isEditFromSearchResults = true;

			scope.crupdateBookingController.cancel();

			expect($state.go).toHaveBeenCalledWith('search-booking-results', param);
		});

	});

	describe('submitBooking():', function(){

		it('should call createBooking and navigate to list-booking if the creation is successful', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});

			spyOn(BookingService,'createBooking').and.callFake(function(){
				return $q.when('success');
			});

			scope.crupdateBookingController.isEditing = false;

			scope.crupdateBookingController.submitBooking();

			scope.$apply();

			expect($state.go).toHaveBeenCalled();
			expect(BookingService.createBooking).toHaveBeenCalled();

		});

		it('should call updateBooking and navigate to list-booking if the update is successful and we came from list-booking', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});

			spyOn(BookingService,'updateBooking').and.callFake(function(){
				return $q.when('success');
			});

			scope.crupdateBookingController.isEditing = true;
			scope.crupdateBookingController.isEditFromView = false;

			scope.crupdateBookingController.submitBooking();

			expect(BookingService.updateBooking).toHaveBeenCalled();

			scope.$apply();

			expect($state.go).toHaveBeenCalledWith('list-booking');


		});

		it('should call updateBooking and navigate to view-booking with the appropriate parameter if the update is successful and we came from view-booking', function(){

			spyOn($state,'go').and.callFake(function(){
				return true;
			});

			spyOn(BookingService,'updateBooking').and.callFake(function(){
				return $q.when('success');
			});

			scope.crupdateBookingController.isEditing = true;
			scope.crupdateBookingController.isEditFromView = true;

			scope.crupdateBookingController.submitBooking();

			expect(BookingService.updateBooking).toHaveBeenCalled();

			scope.$apply();

			expect($state.go).toHaveBeenCalledWith('view-booking', {confirmationNumber: scope.crupdateBookingController.booking.confirmationNumber});
			expect(scope.crupdateBookingController.isEditFromView).toEqual(false);
		});

		it('should not transition states if the creation is unsuccessful and should set submitInProgess to false', function(){

			spyOn(BookingService,'createBooking').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);

			scope.crupdateBookingController.submitBooking();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.crupdateBookingController.submitInProgress).toEqual(false);
		});

		it('should not transition states if the update is unsuccessful and should set submitInProgess to false', function(){

			spyOn(BookingService,'updateBooking').and.callFake(function(){return $q.reject('test');});
			spyOn($state, 'go').and.returnValue(true);
			scope.crupdateBookingController.isEditing = true;

			scope.crupdateBookingController.submitBooking();

			scope.$apply();

			expect($state.go).not.toHaveBeenCalled();
			expect(scope.crupdateBookingController.submitInProgress).toEqual(false);
		});

		it('in update error case, it should set the booking object to the updated booking if one is available', function(){

			spyOn(BookingService,'updateBooking').and.callFake(function(){
				return $q.reject({error: 'test', updatedBooking: 'thing'});
			});
			spyOn($state, 'go').and.returnValue(true);
			scope.crupdateBookingController.isEditing = true;

			scope.crupdateBookingController.submitBooking();

			scope.$apply();
			expect(scope.crupdateBookingController.booking).toEqual('thing');
		});
	});

});
