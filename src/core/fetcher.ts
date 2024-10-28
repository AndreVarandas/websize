/**
 * The result of the fetch operation.
 */
interface FetchResult {
  rawHtml: string;
  transferSizeMB?: number;
}

/**
 * This class is responsible for fetching the raw HTML and
 * calculating the transfer size.
 */
export class Fetcher {
  constructor(private userAgent: string) {}

  /**
   * Fetches the raw HTML and calculates the transfer size.
   * @param url - The URL to fetch.
   *
   * @returns The raw HTML and transfer size.
   */
  async fetch(url: string): Promise<FetchResult> {
    const response = await fetch(url, {
      headers: {
        "User-Agent": this.userAgent,
      },
    });

    const contentLength = response.headers.get("content-length");
    const transferSizeMB = contentLength
      ? parseInt(contentLength, 10) / (1024 * 1024)
      : undefined;

    const rawHtml = await response.text();

    return { rawHtml, transferSizeMB };
  }
}
