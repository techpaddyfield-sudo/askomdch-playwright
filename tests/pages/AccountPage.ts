import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
    readonly heading: Locator;
    readonly sidebar: Locator;
    readonly linkDashboard: Locator;
    readonly linkOrders: Locator;
    readonly linkDownloads: Locator;
    readonly linkAddresses: Locator;
    readonly linkAccountDetails: Locator;
    readonly linkLogout: Locator;
    readonly greeting: Locator;
    readonly bodyText: Locator;

    constructor(page: Page) {
        super(page);
        this.heading = page.getByRole('heading', { name: /^account$/i });
        this.sidebar = page.locator('.woocommerce-MyAccount-navigation');
        this.linkDashboard = this.sidebar.getByRole('link', { name: /^dashboard$/i });
        this.linkOrders = this.sidebar.getByRole('link', { name: /^orders$/i });
        this.linkDownloads = this.sidebar.getByRole('link', { name: /^downloads$/i });
        this.linkAddresses = this.sidebar.getByRole('link', { name: /^addresses$/i });
        this.linkAccountDetails = this.sidebar.getByRole('link', { name: /^account details$/i });
        this.linkLogout = this.sidebar.getByRole('link', { name: /^logout$/i });

        this.greeting = page.locator('.woocommerce-MyAccount-content').locator('p').first();
        this.bodyText = page.locator('.woocommerce-MyAccount-content');
    }

    async open() {
        await this.page.goto('/account/');
        await this.heading.waitFor();
    }

    async gotoOrders() { await this.linkOrders.click(); }
    async gotoDownloads() { await this.linkDownloads.click(); }
    async gotoAddresses() { await this.linkAddresses.click(); }
    async gotoAccountDetails() { await this.linkAccountDetails.click(); }
    async logout() { await this.linkLogout.click(); }
}
