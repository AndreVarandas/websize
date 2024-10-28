/**
 * Represents the result of a fetch operation including raw HTML content
 * and optional transfer size information.
 */
interface FetchResult {
  /** The raw HTML content of the fetched page */
  rawHtml: string;
  /** The size of the transferred data in megabytes (if available) */
  transferSizeMB?: number;
}

/**
 * Fetcher is responsible for retrieving raw HTML content and calculating transfer sizes.
 * It handles HTTP requests with custom user agents and processes response metadata.
 *
 * @example
 * ```typescript
 * const fetcher = new Fetcher("Custom User Agent");
 * const { rawHtml, transferSizeMB } = await fetcher.fetch("https://example.com");
 * ```
 */
export class Fetcher {
  /**
   * Creates a new Fetcher instance.
   *
   * @param userAgent - The user agent string to use for HTTP requests
   */
  constructor(private userAgent: string) {}

  /**
   * Fetches a webpage and calculates its transfer size.
   *
   * @param url - The URL to fetch content from
   * @returns Promise containing the raw HTML content and transfer size (if available)
   * @throws Error if the fetch operation fails or if the response is invalid
   *
   * @example
   * ```typescript
   * const fetcher = new Fetcher("Mozilla/5.0...");
   * try {
   *   const { rawHtml, transferSizeMB } = await fetcher.fetch("https://example.com");
   *   console.log(`Page size: ${transferSizeMB} MB`);
   * } catch (error) {
   *   console.error("Failed to fetch:", error);
   * }
   * ```
   */
  async fetch(url: string): Promise<FetchResult> {
    // Perform the fetch with custom user agent
    const response = await fetch(url, {
      headers: {
        "User-Agent": this.userAgent,
      },
    });

    // Extract content length if available
    const contentLength = response.headers.get("content-length");
    const transferSizeMB = contentLength
      ? parseInt(contentLength, 10) / (1024 * 1024) // Convert bytes to MB
      : undefined;

    // Get the raw HTML content
    const rawHtml = await response.text();

    return { rawHtml, transferSizeMB };
  }
}
