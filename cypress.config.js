const { defineConfig } = require('cypress');
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const fs = require('fs');

module.exports = defineConfig({
  projectId: '8crqv7',
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: true,
  defaultCommandTimeout: 5000,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Notebook report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },
  retries: {
    runMode: 1,
    openMode: 0
  },
  env: {
    USER_LOGIN: 'test',
    USER_PASS: 'test',
    REGISTRATION_NAME: 'tester',
    REGISTRATION_EMAIL: 'test@example.com',
    REGISTRATION_PASS: '1234',
    LOGIN_URL: 'https://enotes.pointschool.ru/login',
    CREATE_BASKET_URL: 'https://enotes.pointschool.ru/basket/create',
    CLEAR_BASKET_URL: 'http://enotes.pointschool.ru/basket/clear',
    GET_BASKET_URL: 'http://enotes.pointschool.ru/basket/get'
  },
  e2e: {
    baseUrl: 'https://enotes.pointschool.ru/',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      require('@cypress/grep/src/plugin')(config);

      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });

      on('after:spec', (spec, results) => {
        if (results && results.video) {
          const failures = results.tests.some((test) =>
            test.attempts.some((attempt) => attempt.state === 'failed'));
          if (!failures) {
            fs.unlinkSync(results.video);
          }
        }
      });
      return config;
    }
  }
});
