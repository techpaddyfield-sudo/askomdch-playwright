import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login tests with beforeAll / afterAll', () => {
    test.beforeAll(async () => {

    });

    test.afterAll(async () => {

    });

    test('Login form renders correctly', async ({ page }) => {
        const login = new LoginPage(page);  // baseURL applies automatically
        await login.open();                 // resolves to https://askomdch.com/account/
        await expect(login.loginForm).toBeVisible();
    });

    test('Invalid credentials keep user on login form', async ({ page }) => {
        const login = new LoginPage(page);
        await login.open();
        await login.login('wrong', 'wrong');
        await expect(page).toHaveURL(/\/account/);
        await expect(login.loginForm).toBeVisible();
    });
});
