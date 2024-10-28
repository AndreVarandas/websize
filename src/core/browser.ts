import { launch } from "jsr:@astral/astral";
import type { WebSizeOptions } from "../types.ts";

/**
 * This class is responsible for launching a browser and
 * getting the rendered content of a page.
 */
export class BrowserManager {
  constructor(private userAgent: string) {}

  /**
   * Gets the rendered content of a page.
   * @param url - The URL to get the rendered content of.
   * @param waitUntil - The wait until condition.
   *
   * @returns The rendered content.
   */
  async getRenderedContent(
    url: string,
    waitUntil: WebSizeOptions["waitUntil"]
  ) {
    const browser = await launch({ headless: true });
    try {
      browser.userAgent = () => Promise.resolve(this.userAgent);
      const page = await browser.newPage();
      await page.goto(url, { waitUntil });

      return await page.content();
    } finally {
      await browser.close();
    }
  }
}
