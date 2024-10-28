import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { WebSize } from "../src/mod.ts";

/**
 * Test suite for WebSize helper functions.
 * Verifies the functionality of static utility methods.
 */
describe("Helper functions", () => {
  /**
   * Verifies that the static measure method returns valid results
   * with expected data types for all measurements.
   */
  it("measure static method should work", async () => {
    const result = await WebSize.measure("https://example.com");
    assertEquals(typeof result.rawSizeKB, "number");
    assertEquals(typeof result.renderedSizeKB, "number");
    assertEquals(typeof result.renderTimeSeconds, "number");
  });
});
