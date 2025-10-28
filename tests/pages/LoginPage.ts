import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly baseUrl: string;
    readonly loginForm: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly remember: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page, baseUrl = 'https://askomdch.com') {
        super(page);
        this.baseUrl = baseUrl;
        this.loginForm = page.locator('form.woocommerce-form.woocommerce-form-login.login');
        this.username = this.loginForm.locator('#username');
        this.password = this.loginForm.locator('#password');
        this.remember = this.loginForm.locator('input[name="rememberme"]');
        this.loginBtn = this.loginForm.locator('button[name="login"]');
    }

    async open() {
        await this.page.goto(`${this.baseUrl}/account/`);
        await this.loginForm.waitFor({ state: 'visible' });
    }

    async login(user: string, pass: string, remember = false) {
        await this.username.fill(user);
        await this.password.fill(pass);
        if (remember) await this.remember.check().catch(() => { });
        await this.loginBtn.click();
    }
}
