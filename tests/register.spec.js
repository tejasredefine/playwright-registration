const { test, expect } = require('@playwright/test');

const users = [
  { firstName: 'Priya', lastName: 'Sharma', email: 'priyasharma@gmail.com', phone: '9871234560', occupation: 'Student', gender: 'Female', password: 'Priya@3456' },
  { firstName: 'Ravi', lastName: 'Kumar', email: 'ravikumar2026@gmail.com', phone: '9988776655', occupation: 'Student', gender: 'Male', password: 'Ravi@9012' },
  { firstName: 'Sara', lastName: 'Mitchell', email: 'saramitchell@gmail.com', phone: '9123456780', occupation: 'Student', gender: 'Female', password: 'Sara@5678' },
  { firstName: 'John', lastName: 'Carter', email: 'johncarter@gmail.com', phone: '9876543210', occupation: 'Student', gender: 'Male', password: 'John@1234' },
];

for (const user of users) {
  test('Register user: ' + user.firstName + ' ' + user.lastName, async ({ page }) => {

    await test.step('Navigate to login page', async () => {
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    });

    await test.step('Click Register link', async () => {
      await page.getByText("Don't have an account?").click();
      await page.waitForURL('**/register');
    });

    await test.step('Fill registration form', async () => {
      await page.getByRole('textbox', { name: 'First Name' }).fill(user.firstName);
      await page.getByRole('textbox', { name: 'Last Name' }).fill(user.lastName);
      await page.getByRole('textbox', { name: 'email@example.com' }).fill(user.email);
      await page.getByRole('textbox', { name: 'enter your number' }).fill(user.phone);
      await page.getByRole('combobox').selectOption(user.occupation);
      if (user.gender === 'Male') {
        await page.getByRole('radio', { name: 'Male', exact: true }).check();
      } else {
        await page.getByRole('radio', { name: 'Female' }).check();
      }
      await page.getByRole('textbox', { name: 'Passsword' }).fill(user.password);
      await page.getByRole('textbox', { name: 'Confirm Password' }).fill(user.password);
      await page.getByRole('checkbox').check();
    });

    await test.step('Submit registration', async () => {
      await page.getByRole('button', { name: 'Register' }).click();
    });

    await test.step('Verify success message', async () => {
      await expect(page.getByText('Account Created Successfully')).toBeVisible({ timeout: 8000 });
    });

  });
}
