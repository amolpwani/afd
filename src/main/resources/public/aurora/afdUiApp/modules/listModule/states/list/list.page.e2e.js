'use strict'; // jshint ignore:line

var IndexPage = require('../../../../index.page.e2e');
var indexPage = new IndexPage();

var ListBookingPage = function(forceAuthenticationFailure, forceDeleteFailure) {
	browser.clearMockModules();
	if (forceAuthenticationFailure) {
		browser.addMockModule('JABHTTPMock', function() {
			angular.module('JABHTTPMock', ['ngMockE2E', 'JabUiAppModule']).run(function($httpBackend) {
				//var error = 'there was an error.';
				$httpBackend.when('OPTIONS', 'http://localhost:11000/Jab7REST/api/bookings').respond(function(/*method, url, data, headers*/) {
					return [200, '', {}, ''];
				});
				$httpBackend.when('GET', 'http://localhost:11000/Jab7REST/api/bookings').respond(function(/*method, url, data, headers*/) {
					return [404, [], {}, ''];
				});
				$httpBackend.when('GET', /.*/).passThrough();
			});
		});
	} else {
		if (forceDeleteFailure) {
			browser.addMockModule('JABHTTPMock', function() {
				angular.module('JABHTTPMock', ['ngMockE2E', 'JabUiAppModule']).run(function($httpBackend) {
					$httpBackend.whenDELETE().respond(500, {
						confirmationNumber: 987654,
						success: false
					});
					$httpBackend.when('GET', 'http://localhost:11000/Jab7REST/api/unprotected/ping').respond(function(/*method, url, data, headers*/) {
						return [404, '', {}, ''];
					});
					$httpBackend.whenGET(/.*/).passThrough();
					$httpBackend.whenPOST(/.*/).passThrough();
					$httpBackend.when('OPTIONS', 'http://localhost:11000/Jab7REST/api/bookings').respond(function(/*method, url, data, headers*/) {
						return [200, '', {}, ''];
					});
				});
			});
		} else {
			browser.addMockModule('JABHTTPMock', function() {

				angular.module('JABHTTPMock', ['ngMockE2E', 'JabUiAppModule']).run(function($httpBackend) {
					// no need to mock the ping file request - it will not be asked for in this case
					$httpBackend.whenGET(/.*/).passThrough();
					$httpBackend.whenPOST(/.*/).passThrough();
					$httpBackend.whenPUT(/.*/).passThrough();
					$httpBackend.whenDELETE(/.*/).passThrough();
					$httpBackend.when('OPTIONS', 'http://localhost:11000/Jab7REST/api/bookings').respond(function(/*method, url, data, headers*/) {
						return [200, '', {}, ''];
					});
				});
			});
		}
	}

};

ListBookingPage.prototype = Object.create({}, {
	load: {
		value: function() {
			return indexPage.load();
		}
	},
	isCurrentPage: {
		value: function() {
			return protractor.ExpectedConditions.and(protractor.ExpectedConditions.elementToBeClickable(element(by.css('.filter-visibility-toggle'))), protractor.ExpectedConditions.invisibilityOf(element(by.id('loading-indicator'))), protractor.ExpectedConditions.invisibilityOf(element(by.css('.wc-table-loading-indicator'))));
		}
	},
	navigateToFirstUpdateBookingOptionsLink: {
		value: function(){
			this.clickFirstBookingRowUpdateOptionsLink().then(function(){
				return browser.wait(function(){
					return element(by.tagName('h2')).isPresent();
				}, 3000, 'did not find the update booking options page before timeout');
			});
		}
	},
	navigateToSecondUpdateBookingFlightLink: {
		value: function(){
			return this.clickSecondBookingRowUpdateFlightLink().then(function(){
				return browser.wait(function(){
					return element(by.tagName('h2')).isPresent();
				}, 3000, 'did not find the update booking flight page before timeout');
			});
		}
	},
	hasConfirmationMessage: {
		value: function() {
			return element(by.css('.alert-success')).getText();
		}
	},
	checkAll: {
		get: function() {
			return $('a.select-all');
		}
	},
	customerHeaderText: {
		value: function() {
			return element(by.binding('listBookingController.headerText')).getText();
		}
	},
	customerInstructionsText: {
		value: function() {
			return element(by.binding('listBookingController.instructionsText')).getText();
		}
	},

	clickDeleteBookingsButtonAndWaitForModal: {
		value: function() {
			//for some reason this will intermittently fail to find the button.
			//more info - when this fails, the button actually is not on the screen...
			//TODO: further investigation on button selector
			browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.deleteBookingsButton)).then(function() {
				this.deleteBookingsButton.click();
			}.bind(this));
			browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.deleteBookingModalSubmit));
		}
	},

	clickModalSubmitAndWait: {
		value: function() {
			this.deleteBookingModalSubmit.click();

			browser.wait(protractor.ExpectedConditions.invisibilityOf(this.deleteBookingModal));
		}
	},

	deleteBookingModal: {
		get: function() {
			return element(by.css('.modal'));
		}
	},
	deleteBookingModalBookingsList: {
		get: function() {
			return element.all(by.css('.modal li'));
		}
	},
	deleteBookingModalCancel: {
		get: function() {
			return element(by.css('#modal-cancel'));
		}
	},
	deleteBookingModalSubmit: {
		get: function() {
			return element(by.css('#modal-submit'));
		}
	},
	deleteBookingErrorMessage: {
		get: function() {
			return element(by.css('.alert-danger'));
		}
	},
	deleteBookingErrorMessages: {
		get: function() {
			return element.all(by.css('.alert-danger'));
		}
	},
	deleteBookingSuccessMessage: {
		get: function() {
			return element(by.css('.alert-success'));
		}
	},
	deleteBookingSuccessMessages: {
		get: function() {
			return element.all(by.css('.alert-success'));
		}
	},
	checkNone: {
		get: function() {
			return $('a.select-none');
		}
	},
	viewLinks: {
		get: function() {
			return element.all(by.css('#list-booking-table tbody tr td:first-child [wc-row-action-single="view-booking"]'));
		}
	},
	deleteLinks: {
		get: function() {
			return element.all(by.css('#list-booking-table tbody tr td:first-child [wc-row-action-single="delete-bookings"]'));
		}
	},
	updateBookingOptionsLinks: {
		get: function() {
			return element.all(by.css('#list-booking-table tbody tr td:first-child [wc-row-action-single="update-booking-options"]'));
		}
	},
	updateFlightInformationLinks: {
		get: function() {
			return element.all(by.css('#list-booking-table tbody tr td:first-child [wc-row-action-single="update-booking-flight"]'));
		}
	},
	clickFirstRowDropdown: {
		value: function() {
			element.all(by.name('moreOptionsDropdown')).first().click();
			return browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.updateBookingOptionsLinks.first()));
		}
	},
	clickSecondRowDropdown: {
		value: function() {
			element.all(by.name('moreOptionsDropdown')).get(1).click();
			return browser.wait(protractor.ExpectedConditions.visibilityOf(this.updateBookingOptionsLinks.get(1)));
		}
	},
	clickFirstBookingRowDeleteLink: {
		value: function() {
			this.clickFirstRowDropdown();
			return this.deleteLinks.first().click();
		}
	},
	clickFirstBookingRowUpdateOptionsLink: {
		value: function() {
			this.clickFirstRowDropdown();
			return this.updateBookingOptionsLinks.first().click();
		}
	},
	clickFirstBookingRowUpdateFlightLink: {
		value: function() {
			this.clickFirstRowDropdown();
			return this.updateFlightInformationLinks.first().click();
		}
	},
	clickSecondBookingRowUpdateFlightLink: {
		value: function() {
			this.clickSecondRowDropdown();
			return this.updateFlightInformationLinks.get(1).click();
		}
	},
	totalNumberOfBookings: {
		value: function() {
			return element.all(by.css('.results-data')).first().getText().then(function(text) {
				var splitArray = text.split(" ");
				return parseInt(splitArray[splitArray.length - 1]);
			});
		}
	},
	tableRows: {
		get: function() {
			return element.all(by.css('#list-booking-table table tbody tr'));
		}
	},
	getBookingConfirmationNumberByIndex: {
		value: function(index) {
			return element.all(by.css('#list-booking-table tbody tr')).get(index).all(by.tagName('td')).get(2).getText();
		}
	},
	allCheckboxes: {
		value: function() {
			return element.all(by.css('#list-booking-table input[type="checkbox"]')).count();
		}
	},
	allSelectedCheckboxes: {
		value: function() {
			return element.all(by.css('#list-booking-table input[type="checkbox"]:checked')).count();
		}
	},
	deleteAllBookings: {
		value: function() {
			var that = this;
			return element.all(by.css('.pagination-results-per-page')).first().click().then(function(){
				return element.all(by.cssContainingText('option', '100')).first().click();
			}).then(function(){
				return element(by.css('#list-booking-table table thead tr th input[type="checkbox"]')).click();
			}).then(function(){
				return that.deleteBookingsButton.click().then(function() {
					// needs to scroll to bottom of page because button may not be in view after modal is present
					return browser.wait(function() {
						return element(by.css('.modal')).isPresent();
					}, 5000, 'Did not find modal before timeout').then(function() {
						return browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(function() {
							return that.deleteBookingModalSubmit.click();
						});
					});
				});
			}).then(function(){
				return browser.wait(function() {
					return element(by.css('.alert-success')).isPresent();
				}, 5000, 'Did not finish deleting bookings before timeout');
			});
		}
	},
	allCheckboxesSelected: {
		value: function() {
			return this.allSelectedCheckboxes().then(function(numOfSelectedCheckboxes) {
				return element.all(by.css('#list-booking-table input[type="checkbox"]')).count().then(function(numOfCheckBoxes) {
					return numOfCheckBoxes == numOfSelectedCheckboxes;
				});
			});
		}
	},
	toggleFirstBookingCheckbox: {
		value: function() {
			return element.all(by.css('tbody input[type="checkbox"]')).first().click();
		}
	},
	toggleSecondBookingCheckbox: {
		value: function() {
			return element.all(by.css('tbody input[type="checkbox"]')).get(1).click();
		}
	},
	firstAndSecondCheckboxesSelected: {
		value: function() {
			//todo use promises here?
			var checkboxes = element.all(by.css('tbody input[type="checkbox"]'));

			return !!(checkboxes.first().isSelected() && checkboxes.get(1).isSelected());
		}
	},
	previousPageLink: {
		get: function() {
			return element.all(by.css('#list-booking-table a.previous')).first();
		}
	},
	nextPageLink: {
		get: function() {
			return element.all(by.css('#list-booking-table a.next')).first();
		}
	},
	createBooking: {
		get: function() {
			return $('#create-booking');
		}
	},
	searchBooking: {
		get: function() {
			return element(by.id('search-booking'));
		}
	},
	deleteBookingsButton: {
		get: function() {
			return element(by.css('#delete-bookings'));
		}
	},
	networkStatusIndicator: {
		get: function() {
			return $('div.onlineOffline');
		}
	},
	authenticationStatusIndicator: {
		get: function() {
			return $('div.authStatus');
		}
	},
	dataSourceIndicator: {
		get: function() {
			return $('div.dataSource');
		}
	},
	dataFreshnessIndicator: {
		get: function() {
			return $('div.freshness');
		}
	},
	navigateToCreateBooking: {
		value: function() {
			return this.createBooking.click();
		}
	},
	userRoleToggle: {
		value: function() {
			return element(by.id('role'));
		}
	},
	userRole: {
		value: function() {
			return this.userRoleToggle().getText();
		}
	},
	clickUserRoleToggle: {
		value: function() {
			return this.userRoleToggle().click();
		}
	},
	selectUserRoleAgent: {
		value: function() {
			return browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.id('role')))).then(function(){
				return this.userRole().then(function(roleText) {
					if (roleText !== 'Booking Agent') {
						return this.clickUserRoleToggle();
					}
					expect(this.userRole()).toEqual('Booking Agent');

					return roleText;
				}.bind(this));
			}.bind(this));
		}
	},
	selectUserRoleCustomer: {
		value: function() {
			return browser.wait(protractor.ExpectedConditions.elementToBeClickable(element(by.id('role')))).then(function(){
				return this.userRole().then(function(roleText) {
					if (roleText !== 'Customer') {
						return this.clickUserRoleToggle();
					}
					expect(this.userRole()).toEqual('Customer');

					return roleText;
				}.bind(this));
			}.bind(this));
		}
	},
	navbarCreateBookingLink: {
		get: function() {
			return $('.navbar-nav a[ui-sref="create-booking.enter-customer-information"]');
		}
	},
	navigateToCreateBookingUsingNavbar: {
		value: function() {
			var that = this;
			return element(by.cssContainingText('.dropdown-toggle', 'Bookings')).click().then(function(){
				that.navbarCreateBookingLink.click();
			});
		}
	},
	clickAuthenticationStatusIndicator: {
		value: function() {
			return this.authenticationStatusIndicator.click();
		}
	},
	columnHeadersText: {
		value: function() {
			//use map implementation for array of promise handling as talked about here:
			//http://stackoverflow.com/questions/21736191/protractor-how-to-get-the-result-of-an-array-of-promises-into-another-array
			return element.all(by.css('th')).map(function(elm){
				return elm.getText();
			});
		}
	},
	forceWslLogout: {
		value: function() {
			return browser.driver.get('https://www.wsl.ford.com/logout.cgi').then(function() {
				//use browser.driver.get instead of this.load as otherwise it will complain about angular sync when navigating
				return browser.driver.get(browser.baseUrl + '#/list-booking').then(function() {
					//force the wait for angular since we are going back into an angular page
					browser.waitForAngular();
				});
			});
		}
	}
});

module.exports = ListBookingPage;