import { launch } from "@astral/astral";
import type { WebSizeOptions } from "../types.ts";

/**
 * BrowserManager is responsible for handling browser interactions and page rendering.
 * It uses Astral (a headless browser) to render pages and capture their content.
 *
 * @example
 * ```typescript
 * const browser = new BrowserManager("Custom User Agent");
 * const content = await browser.getRenderedContent("https://example.com", "networkidle2");
 * ```
 */
export class BrowserManager {
  /**
   * Creates a new BrowserManager instance.
   *
   * @param userAgent - The user agent string to use for browser requests
   */
  constructor(private userAgent: string) {}

  /**
   * Launches a browser, navigates to the specified URL, and retrieves the rendered content.
   * The method ensures proper cleanup by closing the browser after use.
   *
   * @param url - The URL to navigate to and render
   * @param waitUntil - The condition to wait for before considering navigation complete
   *                    Can be 'load', 'networkidle0', 'networkidle2', or 'none'
   * @returns Promise containing the fully rendered HTML content
   * @throws Error if browser launch or navigation fails
   *
   * @example
   * ```typescript
   * const content = await browserManager.getRenderedContent(
   *   "https://example.com",
   *   "networkidle2"
   * );
   * ```
   */
  async getRenderedContent(
    url: string,
    waitUntil: WebSizeOptions["waitUntil"]
  ): Promise<string> {
    const browser = await launch({ headless: true });
    try {
      // Set custom user agent for the browser instance
      browser.userAgent = () => Promise.resolve(this.userAgent);

      // Create new page and navigate
      const page = await browser.newPage();
      await page.goto(url, { waitUntil });

      // Get the fully rendered content
      return await page.content();
    } finally {
      // Ensure browser is always closed, even if an error occurs
      await browser.close();
    }
  }
}
