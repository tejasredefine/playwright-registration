const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,

  use: {
    headless: true,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },

  reporter: [
    ['list'],
    ['allure-playwright'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
