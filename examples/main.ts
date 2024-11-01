import { WebSize } from "../src/mod.ts";
import { WaitUntil } from "../src/types.ts";

/**
 * Demonstrates various ways to use the WebSize library.
 * Includes examples of both static and instance-based measurements.
 *
 * Run this example with:
 * ```bash
 * deno task example
 * ```
 *
 * @returns Promise<void>
 */
async function main() {
  console.log("🔍 WebSize Examples\n");

  /**
   * Example 1: Quick measurement using static method
   * Demonstrates the simplest way to measure a single page
   */
  console.log("Example 1: Quick single measurement");
  const quickResult = await WebSize.measure("https://example.com");
  console.log("Quick measurement result:", quickResult, "\n");

  /**
   * Example 2: Instance-based measurements with custom options
   * Shows how to configure WebSize for multiple measurements
   */
  console.log("Example 2: Multiple measurements with same configuration");
  const webSize = new WebSize({
    verbose: true,
    userAgent: "Custom User Agent",
    waitUntil: WaitUntil.LOAD,
  });

  // List of sites to measure
  const sites = [
    "https://deno.land",
    "https://example.com",
    "https://mozilla.org",
  ];

  console.log("Measuring multiple sites...\n");

  // Measure each site and handle potential errors
  for (const site of sites) {
    try {
      const result = await webSize.calculatePageSize(site);
      console.log(`\n📊 Results for ${site}:`);
      console.log(`- Raw Size: ${result.rawSizeKB.toFixed(2)} KB`);
      console.log(`- Rendered Size: ${result.renderedSizeKB.toFixed(2)} KB`);
      console.log(`- Render Time: ${result.renderTimeSeconds.toFixed(2)}s`);
      if (result.transferSizeMB) {
        console.log(`- Transfer Size: ${result.transferSizeMB.toFixed(2)} MB`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Error measuring ${site}:`, error.message);
      } else {
        console.error(`❌ Error measuring ${site}:`, error);
      }
    }
  }
}

// Run the examples
main().catch(console.error);
