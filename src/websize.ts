import { BrowserManager } from "./core/browser.ts";
import { Fetcher } from "./core/fetcher.ts";
import { SizeCalculator } from "./utils/size.ts";
import { Logger } from "./utils/logger.ts";
import type { PageSizeResult, WebSizeOptions } from "./types.ts";
import { WaitUntil } from "./types.ts";

/**
 * WebSize is responsible for calculating webpage sizes and render times.
 * It provides both instance methods for repeated measurements and static methods for quick, one-off measurements.
 *
 * @example
 * ```typescript
 * // Quick usage
 * const result = await WebSize.measure("https://example.com");
 *
 * // Instance usage for multiple measurements
 * const webSize = new WebSize({ verbose: true });
 * const result = await webSize.calculatePageSize("https://example.com");
 * ```
 */
export class WebSize {
  /**
   * Default configuration options for WebSize measurements
   * @private
   */
  private readonly defaultOptions: Required<WebSizeOptions> = {
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    waitUntil: WaitUntil.NETWORK_IDLE_2,
    verbose: false,
  };

  private options: Required<WebSizeOptions>;
  private fetcher: Fetcher;
  private browserManager: BrowserManager;

  /**
   * Creates a new WebSize instance with the specified options.
   *
   * @param options - Configuration options for measurements
   */
  constructor(options: WebSizeOptions = {}) {
    this.options = { ...this.defaultOptions, ...options };
    this.fetcher = new Fetcher(this.options.userAgent);
    this.browserManager = new BrowserManager(this.options.userAgent);
  }

  /**
   * Calculates comprehensive size metrics for a given webpage.
   *
   * @param url - The URL of the webpage to measure
   * @returns Promise containing size and timing measurements
   * @throws Error if the measurement process fails
   *
   * @example
   * ```typescript
   * const webSize = new WebSize();
   * const result = await webSize.calculatePageSize("https://example.com");
   * console.log(result.rawSizeKB, result.renderedSizeKB);
   * ```
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
        this.options.waitUntil,
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
   * Static helper method for quick, one-off measurements.
   * Creates a temporary WebSize instance, performs the measurement, and returns the result.
   *
   * @param url - The URL of the webpage to measure
   * @param options - Optional configuration options
   * @returns Promise containing size and timing measurements
   *
   * @example
   * ```typescript
   * const result = await WebSize.measure("https://example.com", { verbose: true });
   * ```
   */
  static async measure(
    url: string,
    options?: WebSizeOptions,
  ): Promise<PageSizeResult> {
    const instance = new WebSize(options);
    return await instance.calculatePageSize(url);
  }
}
