const { chromium } = require('playwright');

const users = [
  { firstName: 'Priya', lastName: 'Sharma', email: 'priyasharma@gmail.com', phone: '9871234560', occupation: 'Student', gender: 'Female', password: 'Priya@3456' },
  { firstName: 'Ravi', lastName: 'Kumar', email: 'ravikumar2026@gmail.com', phone: '9988776655', occupation: 'Student', gender: 'Male', password: 'Ravi@9012' },
  { firstName: 'Sara', lastName: 'Mitchell', email: 'saramitchell@gmail.com', phone: '9123456780', occupation: 'Student', gender: 'Female', password: 'Sara@5678' },
  { firstName: 'John', lastName: 'Carter', email: 'johncarter@gmail.com', phone: '9876543210', occupation: 'Student', gender: 'Male', password: 'John@1234' },
];

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();

  for (const user of users) {
    console.log('\nRegistering: ' + user.firstName + ' ' + user.lastName);
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByText("Don't have an account?").click();
    await page.waitForURL('**/register');
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
    await page.getByRole('button', { name: 'Register' }).click();
    try {
      await page.waitForSelector('text=Account Created Successfully', { timeout: 5000 });
      console.log('✅ ' + user.firstName + ' ' + user.lastName + ' - Account Created Successfully!');
    } catch {
      console.log('❌ ' + user.firstName + ' ' + user.lastName + ' - Registration may have failed.');
    }
    await page.close();
  }

  await browser.close();
  console.log('\n🎉 All registrations completed!');
})();