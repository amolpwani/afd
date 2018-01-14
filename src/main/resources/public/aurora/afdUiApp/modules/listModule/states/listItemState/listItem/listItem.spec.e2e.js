'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
var HelperPage = require('../../../../../test/lib/test-helpers.js');
var ListBookingPage = require('./listBooking.page.e2e.js');
var EnterCustomerInformationPage = require('./../crupdateBooking/enterCustomerInformation/enterCustomerInformation.page.e2e.js');
var SearchBookingCriteriaPage = require('./../searchBooking/searchBookingCriteria/searchBookingCriteria.page.e2e.js');
var SelectBookingOptionsPage = require('../crupdateBooking/selectBookingOptions/selectBookingOptions.page.e2e.js');
var SelectDepartingFlightPage = require('../crupdateBooking/selectDepartingFlight/selectDepartingFlight.page.e2e.js');

describe('List Booking Page ', function() {
	var helperPage = new HelperPage();
	var listBookingPage;
	var enterCustomerInformationPage = new EnterCustomerInformationPage();
	var searchBookingCriteriaPage = new SearchBookingCriteriaPage();
	var selectBookingOptionsPage = new SelectBookingOptionsPage();
	var selectDepartingFlightPage = new SelectDepartingFlightPage();

	beforeAll(function(){
		helperPage.login();
	});

	describe('', function() {
		beforeEach(function() {
			listBookingPage = new ListBookingPage();
			listBookingPage.load();
		});

		it('should update the page title to reflect List Booking', function() {
			expect(helperPage.getPageTitle()).toEqual('List Booking | JabUiApp');
		});

		it('should navigate to Search Booking upon selection of the "Search Booking" link', function() {
			listBookingPage.searchBooking.click();

			expect(searchBookingCriteriaPage.isCurrentPage()).toBeTruthy();
		});

		it('should display correct columns for customer view when the user is acting as a customer', function() {
			listBookingPage.selectUserRoleCustomer();
			browser.wait(listBookingPage.isCurrentPage());

			var customerColumnHeaders = ['Actions', 'Booking Confirmation Number', 'Adventure', 'Start Date', 'End Date'];

			listBookingPage.columnHeadersText().then(function(result){
				for(var i=0; i<result.length; i++){
					expect(result[i]).toEqual(customerColumnHeaders[i]);
				}
			});

			listBookingPage.selectUserRoleAgent();
			browser.wait(listBookingPage.isCurrentPage());
			expect(listBookingPage.userRole()).toEqual('Booking Agent');
		});

		it('should not allow the user to navigate to Create Booking when the user is acting as a customer', function() {
			listBookingPage.selectUserRoleCustomer();
			expect(listBookingPage.navbarCreateBookingLink.isPresent()).toBeFalsy();
			expect(listBookingPage.createBooking.isPresent()).toBeFalsy();
			listBookingPage.selectUserRoleAgent();
			expect(listBookingPage.userRole()).toEqual('Booking Agent');
		});

		it('should allow the user to navigate to Create Booking when the user is acting as an agent', function() {
			browser.wait(listBookingPage.navbarCreateBookingLink.isPresent());
			listBookingPage.navigateToCreateBookingUsingNavbar();

			expect(enterCustomerInformationPage.isCurrentPage()).toBeTruthy();
		});

		it('should allow user to check all bookings when the user is acting as an agent', function() {
			listBookingPage.selectUserRoleAgent();
			expect(listBookingPage.checkAll.isPresent()).toBeTruthy();
			expect(listBookingPage.checkNone.isPresent()).toBeTruthy();
		});

		it('should display a customer users name and email', function() {
			listBookingPage.selectUserRoleCustomer();
			expect(listBookingPage.customerHeaderText()).toContain('Bookings for');
			expect(listBookingPage.customerInstructionsText()).toEqual('Your bookings are listed below. Please contact your agent for information about updating or canceling your bookings.');
			listBookingPage.selectUserRoleAgent();
			expect(listBookingPage.userRole()).toEqual('Booking Agent');
		});

		it('should not allow user to navigate to create-booking when acting as a customer', function() {
			listBookingPage.selectUserRoleCustomer();
			//noinspection NodeModulesDependencies
			browser.wait(listBookingPage.isCurrentPage());
			//this reloads the whole angular page rather than just navigating
			//browser.get('#/create-booking');
			browser.setLocation('create-booking');
			expect(listBookingPage.isCurrentPage()).toBeTruthy();
			listBookingPage.selectUserRoleAgent();
			browser.wait(listBookingPage.isCurrentPage());
			expect(listBookingPage.userRole()).toEqual('Booking Agent');
		});

		it('should redirect user back to list booking when switching from agent to customer role on enter customer information', function() {
			listBookingPage.selectUserRoleAgent();
			browser.wait(listBookingPage.isCurrentPage());
			browser.setLocation('create-booking');
			expect(enterCustomerInformationPage.isCurrentPage()).toBeTruthy();
			listBookingPage.selectUserRoleCustomer();
			expect(listBookingPage.isCurrentPage()).toBeTruthy();
			listBookingPage.selectUserRoleAgent();
			expect(listBookingPage.userRole()).toEqual('Booking Agent');
		});
	});


	describe('', function() {
		beforeEach(function() {
			listBookingPage = new ListBookingPage(false, true);
			listBookingPage.load();
		});

		it('should display a failure message on the list booking screen when the delete request fails', function() {
			listBookingPage.toggleFirstBookingCheckbox();
			listBookingPage.deleteBookingsButton.click();
			browser.wait(protractor.ExpectedConditions.elementToBeClickable(listBookingPage.deleteBookingModalSubmit));
			listBookingPage.deleteBookingModalSubmit.click();

			expect(listBookingPage.deleteBookingModal.isPresent()).toBeFalsy();
			expect(listBookingPage.deleteBookingSuccessMessage.isPresent()).toBeFalsy();
			expect(listBookingPage.deleteBookingErrorMessage.isPresent()).toBeTruthy();
		});

		it('should only display a single failure message even if multiple deletes were requested', function() {
			listBookingPage.toggleFirstBookingCheckbox();
			listBookingPage.toggleSecondBookingCheckbox();

			listBookingPage.deleteBookingsButton.click();
			listBookingPage.deleteBookingModalSubmit.click();
			expect(listBookingPage.deleteBookingModal.isPresent()).toBeFalsy();
			expect(listBookingPage.deleteBookingErrorMessage.isPresent()).toBeTruthy();
		});
	});

	describe('Delete Bookings ', function() {
		beforeEach(function() {
			listBookingPage = new ListBookingPage();
			listBookingPage.load();
		});

		it('should show a modal dialog when the user clicks the delete button', function() {
			listBookingPage.toggleFirstBookingCheckbox();
			listBookingPage.deleteBookingsButton.click();

			expect(listBookingPage.deleteBookingModal.isPresent()).toBeTruthy();
		});

		it('should show a list of booking confirmation numbers to match the selections made in the table', function() {
			listBookingPage.toggleFirstBookingCheckbox();
			listBookingPage.toggleSecondBookingCheckbox();
			listBookingPage.deleteBookingsButton.click();

			expect(listBookingPage.deleteBookingModalBookingsList.count()).toEqual(2);
		});

		it('should close the modal and maintain selections in the table when the user selects no', function() {
			listBookingPage.toggleFirstBookingCheckbox();
			listBookingPage.toggleSecondBookingCheckbox();
			listBookingPage.deleteBookingsButton.click();
			listBookingPage.deleteBookingModalCancel.click();

			expect(listBookingPage.deleteBookingModal.isPresent()).toBeFalsy();
			expect(listBookingPage.firstAndSecondCheckboxesSelected()).toBeTruthy();
		});

		it('should have a delete link for every row in the table', function() {
			var numberOfLinks = listBookingPage.deleteLinks.count();
			var numberOfRows = listBookingPage.tableRows.count();

			expect(numberOfLinks).toEqual(numberOfRows);
		});

		it('should display a deleteBookingModal upon selection an individual delete booking link', function() {
			listBookingPage.clickFirstBookingRowDeleteLink();

			expect(listBookingPage.deleteBookingModal.isPresent()).toBeTruthy();
		});

		it('should display a success messsage on the list booking screen when the delete request succeeds', function() {
			listBookingPage.toggleFirstBookingCheckbox();

			listBookingPage.clickDeleteBookingsButtonAndWaitForModal();
			listBookingPage.clickModalSubmitAndWait();

			expect(listBookingPage.deleteBookingModal.isPresent()).toBeFalsy();
			expect(listBookingPage.deleteBookingSuccessMessage.isPresent()).toBeTruthy();
			expect(listBookingPage.deleteBookingErrorMessage.isDisplayed()).toBeFalsy();
		});


		xit('should display a success message and refresh the page when the delete bookings request succeeds', function() {
			listBookingPage.toggleFirstBookingCheckbox();
			listBookingPage.toggleSecondBookingCheckbox();


			listBookingPage.totalNumberOfBookings().then(function(numOfRows) {
				listBookingPage.clickDeleteBookingsButtonAndWaitForModal();
				listBookingPage.clickModalSubmitAndWait();

				expect(listBookingPage.deleteBookingModal.isPresent()).toBeFalsy();
				expect(listBookingPage.firstAndSecondCheckboxesSelected()).toBeTruthy();
				expect(listBookingPage.totalNumberOfBookings()).toEqual(numOfRows - 2);
			});
		});
	});

	describe('Update Bookings ', function() {
		beforeEach(function () {
			listBookingPage = new ListBookingPage();
			listBookingPage.load();
		});

		it('should have an update booking options link and an update flight information link for every row in the table', function() {
			var numberOfRows = listBookingPage.tableRows.count();

			expect(listBookingPage.updateBookingOptionsLinks.count()).toEqual(numberOfRows);
			expect(listBookingPage.updateFlightInformationLinks.count()).toEqual(numberOfRows);
		});

		it('should navigate to the update booking options screen when a link is clicked', function(){
			listBookingPage.clickFirstBookingRowUpdateOptionsLink();
			expect(selectBookingOptionsPage.isCurrentPage()).toBeTruthy();
		});

		it('should navigate to the update flight information screen when a link is clicked', function(){
			listBookingPage.clickFirstBookingRowUpdateFlightLink();
			expect(selectDepartingFlightPage.isCurrentPage()).toBeTruthy();
		});
	});
});
