import { launch } from "jsr:@astral/astral";
import type { WebSizeOptions } from "../types.ts";

export class BrowserManager {
  constructor(private userAgent: string) {}

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
