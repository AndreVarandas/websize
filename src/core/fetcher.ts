interface FetchResult {
  rawHtml: string;
  transferSizeMB?: number;
}

export class Fetcher {
  constructor(private userAgent: string) {}

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
