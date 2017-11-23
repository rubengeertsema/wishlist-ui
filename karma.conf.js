// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-htmlfile-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      {pattern: './src/test.ts', watched: false}
    ],
    preprocessors: {
      './src/test.ts': ['@angular/cli']
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'json'],
      dir: path.join(__dirname, 'reports/coverage'),
      fixWebpackSourcePaths: true,
      thresholds: { // These thresholds need to be much higher but is out of scope for this meetup/tutorial
        global: { // thresholds for all files
          statements: 60,
          lines: 60,
          branches: 40,
          functions: 20
        },
        each: { // thresholds per file
          statements: 30,
          lines: 30,
          branches: 0,
          functions: 10
        }
      }
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul', 'junit', 'html']
      : ['progress', 'kjhtml', 'junit', 'html'],
    junitReporter: {
      outputDir: 'reports/unit',
      outputFile: 'testresults.xml',
      useBrowserName: false,
      suite: 'unit',
      xmlVersion: null
    },
    htmlReporter: {
      outputFile: 'reports/unit/testresults.html',
      pageTitle: 'Unit Tests',
      subPageTitle: 'Portaal',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: false
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'ChromeHeadless'],
    singleRun: false,
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222'
        ]
      }
    }
  });
};
