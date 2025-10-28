import { Page, Locator } from '@playwright/test'

export class BasePage {

    protected readonly page: Page;
    constructor(page: Page) {
        this.page = page;

    }

    async navigate(path: string) {
        await this.page.goto(path);
    }

    async waitforIdle() {
        await this.page.waitForLoadState('networkidle');
    }

    async click(el: Locator) {
        await el.click();

    }
    async type(el: Locator, value: string) {
        await el.fill(value);
    }


}