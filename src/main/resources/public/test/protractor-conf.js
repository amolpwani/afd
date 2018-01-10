/**
 * Protractor configuration
 * SEE: http://karma-runner.github.io/1.0/config/configuration-file.html
 */
exports.config = {
	seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-3.4.0.jar',
	chromeDriver: '../../node_modules/protractor/selenium/chromedriver.exe',

	allScriptsTimeout: 11000,

	specs: [
		'../**/*.spec.e2e.js'
	],

	chromeOnly: false,
	capabilities: {
		'browserName': 'chrome',
		shardTestFiles: false,
		maxInstances: 10

	},

	// update to match your localhost server port 
	baseUrl: 'http://localhost:9500/src/boilerplate/index.html',
    rootElement: '#ng-app',

    framework: 'jasmine2',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000,
        showColors: true,
        print: function() {}
    },

    onPrepare: function() {
        //set browser size
        browser.manage().window().setSize(1024, 768);

        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            savePath: 'src/test_out/e2e',
            consolidateAll: true
        }));
        jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
            verbosity: 3,
            color: true,
            showStack: true
        }));
	}
};