import { assertRejects } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { WebSize } from "../src/mod.ts";
import { stub } from "@std/testing/mock";

/**
 * Test the WebSize class with mocks.
 */
describe("WebSize with mocks", () => {
  let webSize: WebSize;

  beforeEach(() => {
    webSize = new WebSize();
  });

  /**
   * Test that the WebSize class handles fetch errors gracefully.
   */
  it("should handle fetch errors gracefully", async () => {
    // Mock global fetch
    const originalFetch = globalThis.fetch;
    globalThis.fetch = stub(globalThis, "fetch", () =>
      Promise.reject(new Error("Network error"))
    ) as typeof globalThis.fetch;

    try {
      await assertRejects(
        () => webSize.calculatePageSize("https://example.com"),
        Error,
        "Network error"
      );
    } finally {
      // Restore original fetch
      globalThis.fetch = originalFetch;
    }
  });
});
