import { test, expect, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';

let context: BrowserContext;
let page: Page;
let login: LoginPage;
let account: AccountPage;

// read creds from env to avoid hardcoding
const USER = process.env.ACCOUNT_USER!;
const PASS = process.env.ACCOUNT_PASS!;

test.describe('[Account] Dashboard & navigation', () => {
    test.skip(!USER || !PASS, 'Set ACCOUNT_USER and ACCOUNT_PASS env vars to run account tests.');

    test.beforeAll(async ({ browser, baseURL }) => {
        context = await browser.newContext();
        page = await context.newPage();

        login = new LoginPage(page, baseURL ?? 'https://askomdch.com');
        account = new AccountPage(page);

        await login.open();
        await login.login(USER, PASS);
        await account.open(); // ensure we land on /account/
    });

    test.afterAll(async () => {
        await context.close();
    });

    test('Sidebar and greeting render', async () => {
        await expect(account.heading).toBeVisible();
        await expect(account.sidebar).toBeVisible();
        await expect(account.linkDashboard).toBeVisible();
        await expect(account.linkOrders).toBeVisible();
        await expect(account.linkDownloads).toBeVisible();
        await expect(account.linkAddresses).toBeVisible();
        await expect(account.linkAccountDetails).toBeVisible();
        await expect(account.linkLogout).toBeVisible();

        // greeting contains Hello <username>
        await expect(account.greeting).toContainText(/hello\s+\w+/i);
    });

    test('Navigate to Orders / Downloads / Addresses / Account details', async () => {
        await account.gotoOrders();
        await expect(page).toHaveURL(/\/account\/orders\/?/);

        await account.gotoDownloads();
        await expect(page).toHaveURL(/\/account\/downloads\/?/);

        await account.gotoAddresses();
        await expect(page).toHaveURL(/\/account\/edit-address\/?/);

        await account.gotoAccountDetails();
        await expect(page).toHaveURL(/\/account\/edit-account\/?/);

        // go back to dashboard
        await account.linkDashboard.click();
        await expect(page).toHaveURL(/\/account\/?$/);
    });

    test('Logout returns to login form', async () => {
        await account.logout();
        // the login form should be visible again
        await expect(page.locator('form.woocommerce-form-login')).toBeVisible();
        await expect(page).toHaveURL(/\/account\/?$/);
    });
});
