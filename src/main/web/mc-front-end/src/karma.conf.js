// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-junit-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('@angular-devkit/build-angular/plugins/karma')
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageIstanbulReporter: {
			dir: require('path').join(__dirname, '../coverage/mc-front-end'),
			reports: ['html', 'lcovonly', 'text-summary'],
			fixWebpackSourcePaths: true
		},
		reporters: ['progress', 'kjhtml', 'junit'],
		junitReporter: {
			outputDir: '../../../../../build/karma-reports',
			outputFile: 'TEST-mc-front-end.xml',
			useBrowserName: false,
			suite: 'Karma'
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],
		customLaunchers: {
			ChromeHeadlessNoSandbox: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox']
			},
			singleRun: false,
			restartOnFileChange: true
		}
	});
};
