'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
var HelperPage = require('../../../../test/lib/test-helpers.js');
var HomePage = require('./home.page.e2e.js');

describe('homePage: ', function () {
    var helperPage = new HelperPage();
    var homePage = new HomePage();

    beforeEach(function () {
        helperPage.login().then(function () {
            homePage.load();
        });
    });

    it('should navigate to the home page', function () {
        expect(homePage.isCurrentPage()).toBeTruthy();
    });




});