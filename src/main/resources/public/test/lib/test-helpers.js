'use strict';

function hasDependency(dependency, moduleDependencies) {
	return moduleDependencies.indexOf(dependency) >= 0;
};

var HelperPage = function() {};

HelperPage.prototype = Object.create({}, {

	loggedIn: {
		writable: true,
		value: false
	},
	isLoggedIn: {
		set: function(value) {
			this.loggedIn = value;
		},
		get: function() {
			return this.loggedIn;
		}
	},
	login: {
		value: function() {
			//this function will now return a promise for proper flow control. it needs to be handled at the calling point.
			if (!this.isLoggedIn) {
				//now using browser.driver.get and browser.driver.findElement for proper support of non-angular pages.
				return browser.driver.get('https://www.wsl.ford.com/default.cgi').then((function(){
					return browser.driver.findElement(by.id('ADloginStrongAuthRef')).getAttribute('href').then((function(href){
						return browser.driver.get(href).then((function(){
							this.isLoggedIn = true;
							return this.isLoggedIn;
						}).bind(this));
					}).bind(this));
				}).bind(this));
			}
			else {
				//since we are already logged in, we don't need to go through the browser.wait shenanigans.
				//we do need to create our own promise to return to the calling function, though.
				var d = protractor.promise.defer();
				d.fulfill('already logged in');
				return d;
			}
		}
	},
	formatDate: {
		value: function(dateObject, dateFormat) {

			return browser.executeScript(function(dateObject, dateFormat) {
					var dateFilter = angular.injector(['ng']).get('dateFilter');
					return dateFilter(dateObject, dateFormat);
				}, dateObject, dateFormat)
				.then(function(dateString) {
					return dateString;
				});
		}
	}

});

module.exports = HelperPage;