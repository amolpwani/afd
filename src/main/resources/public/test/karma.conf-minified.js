/**
 * Karma configuration
 * SEE: http://karma-runner.github.io/0.12/config/configuration-file.html
 */
module.exports = function(config) {
	config.set({

		basePath: '../',

		files: [
			'webCore/FRF-Vendor*.min.js',
			'webCore/FRF-webCore*.min.js',
			'../node_modules/angular-mocks/angular-mocks.js',

			'test/lib/test-helpers.js',
			'boilerplate/*newUiApp*.min.js',
			'boilerplate/**/*.spec.js'
		],

		exclude: [
			'../**/*.spec.e2e.js',
			'../**/*.page.e2e.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['PhantomJS'],

		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher',
			'karma-firefox-launcher',
			'karma-ie-launcher',
			'karma-phantomjs-launcher',
			'karma-htmlfile-reporter',
			'karma-coverage'
		],

		logLevel: 'config.LOG_INFO',

		reporters: ['progress', 'html', 'coverage'],

		preprocessors: {
			'boilerplate/newUiApp/**/!(*spec).js': ['coverage']
		},

		htmlReporter: {
			outputFile: 'test_out/unit.html'
		},

		coverageReporter: {
			instrumenters: {
				istanbul : require('../../node_modules/istanbul')
			},
			instrumenter: {
				'**/*.js': 'istanbul'
			},
			instrumenterOptions: {
				istanbul: {
					noCompact: true
				}
			},
			reporters: [{
				type: 'html',
				dir: 'test_out/coverage/'
			}]
		}
	});
};