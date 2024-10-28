import { assertRejects } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { WebSize } from "../src/mod.ts";
import { stub } from "@std/testing/mock";

/**
 * Test suite for WebSize error handling and edge cases.
 * Uses mocks to simulate various failure scenarios and verify error handling.
 *
 * @group Unit
 * @group Mocks
 */
describe("WebSize with mocks", () => {
  /** Instance of WebSize used across tests */
  let webSize: WebSize;

  /**
   * Creates a fresh WebSize instance before each test
   * to ensure test isolation.
   */
  beforeEach(() => {
    webSize = new WebSize();
  });

  /**
   * Tests error handling when network requests fail.
   * Verifies that:
   * 1. Network errors are caught and properly wrapped
   * 2. Error messages are preserved and propagated
   * 3. The error is of the expected type
   *
   * @example
   * ```typescript
   * // The test verifies this scenario:
   * try {
   *   await webSize.calculatePageSize("https://example.com");
   * } catch (error) {
   *   // Should receive: "Failed to calculate page size: Network error"
   * }
   * ```
   */
  it("should handle fetch errors gracefully", async () => {
    // Store original fetch for restoration
    const originalFetch = globalThis.fetch;

    // Mock global fetch to simulate network error
    globalThis.fetch = stub(
      globalThis,
      "fetch",
      () => Promise.reject(new Error("Network error")),
    ) as typeof globalThis.fetch;

    try {
      // Verify that the error is properly wrapped and propagated
      await assertRejects(
        () => webSize.calculatePageSize("https://example.com"),
        Error,
        "Network error",
      );
    } finally {
      // Restore original fetch to prevent test interference
      globalThis.fetch = originalFetch;
    }
  });
});
