import { BrowserManager } from "./core/browser.ts";
import { Fetcher } from "./core/fetcher.ts";
import { SizeCalculator } from "./utils/size.ts";
import { Logger } from "./utils/logger.ts";
import type { PageSizeResult, WebSizeOptions } from "./types.ts";
import { WaitUntil } from "./types.ts";

/**
 * Responsible for calculating the page size of a given URL.
 *
 * Use this class if you want to measure the page size of a given URL with more
 * control over the options.
 */
export class WebSize {
  private readonly defaultOptions: Required<WebSizeOptions> = {
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    waitUntil: WaitUntil.NETWORK_IDLE_2,
    verbose: false,
  };

  /**
   * The options for the WebSize class.
   */
  private options: Required<WebSizeOptions>;

  /**
   * The fetcher for the WebSize class.
   */
  private fetcher: Fetcher;

  /**
   * The browser manager for the WebSize class.
   */
  private browserManager: BrowserManager;

  /**
   * Constructor for the WebSize class.
   *
   * @param options - The options for the WebSize class.
   */
  constructor(options: WebSizeOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
    this.fetcher = new Fetcher(this.options.userAgent);
    this.browserManager = new BrowserManager(this.options.userAgent);
  }

  /**
   * Calculates the page size.
   *
   * @param url - The URL to calculate the page size of.
   *
   * @returns The page size result.
   */
  async calculatePageSize(url: string): Promise<PageSizeResult> {
    const startTime = performance.now();

    try {
      // Get raw HTML and transfer size
      const { rawHtml, transferSizeMB } = await this.fetcher.fetch(url);
      const rawSizeKB = SizeCalculator.calculateKilobytes(rawHtml);

      // Get rendered content
      const renderedContent = await this.browserManager.getRenderedContent(
        url,
        this.options.waitUntil
      );
      const renderedSizeKB = SizeCalculator.calculateKilobytes(renderedContent);

      const renderTimeSeconds = (performance.now() - startTime) / 1000;

      if (this.options.verbose) {
        Logger.logResults({
          url,
          rawSizeKB,
          renderedSizeKB,
          renderTimeSeconds,
          transferSizeMB,
        });
      }

      return {
        rawSizeKB,
        renderedSizeKB,
        renderTimeSeconds,
        transferSizeMB,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to calculate page size: ${error.message}`);
      } else {
        throw new Error(`Failed to calculate page size: ${error}`);
      }
    }
  }

  /**
   * Static helper method for quick, one-off measurements
   */
  static async measure(
    url: string,
    options?: WebSizeOptions
  ): Promise<PageSizeResult> {
    const instance = new WebSize(options);

    return await instance.calculatePageSize(url);
  }
}
