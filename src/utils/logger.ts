import type { LogConfig } from "../types.ts";

/**
 * Logger provides formatted console output for WebSize measurement results.
 * It handles the presentation of size metrics and timing data in a readable format.
 *
 * @example
 * ```typescript
 * Logger.logResults({
 *   url: "https://example.com",
 *   rawSizeKB: 15.5,
 *   renderedSizeKB: 25.7,
 *   renderTimeSeconds: 1.2,
 *   transferSizeMB: 0.35
 * });
 * ```
 */
export class Logger {
  /**
   * Formats and logs the results of a page size calculation.
   * Outputs a formatted table with dividers and emoji indicators.
   *
   * @param config - Configuration object containing measurement results
   * @param config.url - The URL that was measured
   * @param config.rawSizeKB - Size of raw HTML in kilobytes
   * @param config.renderedSizeKB - Size of rendered content in kilobytes
   * @param config.renderTimeSeconds - Time taken to render in seconds
   * @param config.transferSizeMB - Optional network transfer size in megabytes
   *
   * @example
   * ```typescript
   * Logger.logResults({
   *   url: "https://example.com",
   *   rawSizeKB: 15.5,
   *   renderedSizeKB: 25.7,
   *   renderTimeSeconds: 1.2,
   *   transferSizeMB: 0.35
   * });
   *
   * // Output:
   * // 📊 WebSize Results:
   * // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * // 🌐 URL: https://example.com
   * // 📈 Measurements:
   * //   • Raw HTML Size: 15.50 KB
   * //   • Rendered Size: 25.70 KB
   * //   • Network Transfer: 0.35 MB
   * //   • Render Time: 1.20s
   * // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * ```
   */
  static logResults({
    url,
    rawSizeKB,
    renderedSizeKB,
    renderTimeSeconds,
    transferSizeMB,
  }: LogConfig): void {
    // Header
    console.log("\n📊 WebSize Results:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // URL
    console.log(`🌐 URL: ${url}`);

    // Measurements section
    console.log("📈 Measurements:");
    console.log(`  • Raw HTML Size: ${rawSizeKB.toFixed(2)} KB`);
    console.log(`  • Rendered Size: ${renderedSizeKB.toFixed(2)} KB`);
    if (transferSizeMB) {
      console.log(`  • Network Transfer: ${transferSizeMB.toFixed(2)} MB`);
    }
    console.log(`  • Render Time: ${renderTimeSeconds.toFixed(2)}s`);

    // Footer
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  }
}
