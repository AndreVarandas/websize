import type { LogConfig } from "../types.ts";

/**
 * This class helps with logging the results of the page size calculation.
 */
export class Logger {
  /**
   * Logs the results of the page size calculation.
   *
   * @param config - The log configuration.
   */
  static logResults({
    url,
    rawSizeKB,
    renderedSizeKB,
    renderTimeSeconds,
    transferSizeMB,
  }: LogConfig) {
    console.log("\n📊 WebSize Results:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`🌐 URL: ${url}`);
    console.log("📈 Measurements:");
    console.log(`  • Raw HTML Size: ${rawSizeKB.toFixed(2)} KB`);
    console.log(`  • Rendered Size: ${renderedSizeKB.toFixed(2)} KB`);
    if (transferSizeMB) {
      console.log(`  • Network Transfer: ${transferSizeMB.toFixed(2)} MB`);
    }
    console.log(`  • Render Time: ${renderTimeSeconds.toFixed(2)}s`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  }
}
