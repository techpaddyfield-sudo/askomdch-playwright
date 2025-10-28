import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
    private readonly baseUrl: string;   // ✅ add

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

    // ✅ accept baseUrl (fallback to production)
    constructor(page: Page, baseUrl = 'https://askomdch.com') {
        super(page);
        this.baseUrl = baseUrl;

        this.heading = page.getByRole('heading', { name: /account/i }); // looser match is safer
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
        // ✅ use absolute URL because baseURL doesn't apply to custom contexts
        await this.page.goto(`${this.baseUrl}/account/`, { waitUntil: 'domcontentloaded' });
        await this.heading.waitFor();
    }

    async gotoOrders() { await this.linkOrders.click(); }
    async gotoDownloads() { await this.linkDownloads.click(); }
    async gotoAddresses() { await this.linkAddresses.click(); }
    async gotoAccountDetails() { await this.linkAccountDetails.click(); }
    async logout() { await this.linkLogout.click(); }
}
