'use strict';

var homePage = function() {
    browser.clearMockModules();
};

homePage.prototype = Object.create({}, {
    isCurrentPage: {
        value: function() {
            return browser.wait(function() {
                return element(by.tagName('h1')).getText().then(function(text){
                    return (text == 'Welcome to the FRF Boilerplate!');
                });
            }, 3000, 'Did not find home page before timeout');
        }
    },

    load: {
        value: function() {
            return browser.get('#/home');
        }
    }


});

module.exports = homePage;