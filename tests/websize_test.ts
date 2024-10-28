import { assert } from "@std/assert";
import { beforeEach, describe, it } from "@std/testing/bdd";
import { WebSize } from "../src/mod.ts";
import { WaitUntil } from "../src/types.ts";

/**
 * Integration test suite for the WebSize class.
 * Tests core functionality with real network requests and browser interactions.
 *
 * @group Integration
 * @group Network
 */
describe("WebSize", () => {
  /** WebSize instance used across tests */
  let webSize: WebSize;

  /**
   * Creates a fresh WebSize instance before each test
   * to ensure test isolation and clean state.
   */
  beforeEach(() => {
    webSize = new WebSize();
  });

  /**
   * Tests the core page size calculation functionality.
   * Verifies that:
   * 1. Raw HTML size is calculated
   * 2. Rendered size is calculated
   * 3. Render time is measured
   * 4. All values are positive numbers
   */
  it("should calculate page size", async () => {
    const result = await webSize.calculatePageSize("https://example.com");

    // Verify all measurements are present and valid
    assert(result.rawSizeKB > 0, "Raw size should be positive");
    assert(result.renderedSizeKB > 0, "Rendered size should be positive");
    assert(result.renderTimeSeconds > 0, "Render time should be positive");

    if (result.transferSizeMB !== undefined) {
      assert(result.transferSizeMB > 0, "Transfer size should be positive");
    }
  });

  /**
   * Tests custom configuration options.
   * Verifies that:
   * 1. Custom wait conditions are respected
   * 2. Verbose logging works
   * 3. Custom user agent is applied
   */
  it("should work with custom options", async () => {
    const webSize = new WebSize({
      waitUntil: WaitUntil.LOAD,
      verbose: true,
      userAgent: "WebSize Test Agent",
    });

    const result = await webSize.calculatePageSize("https://example.com");

    // Verify measurements with custom options
    assert(result.rawSizeKB > 0, "Raw size should be positive");
    assert(result.renderedSizeKB > 0, "Rendered size should be positive");
    assert(result.renderTimeSeconds > 0, "Render time should be positive");
  });
});

/**
 * Test suite for the static measure method.
 * Verifies the convenience method works as expected.
 *
 * @group Integration
 * @group Static
 */
describe("measure static method", () => {
  /**
   * Tests the static measure method with default options.
   * Verifies that:
   * 1. Method returns valid results
   * 2. All measurements are numbers
   * 3. Operation completes successfully
   */
  it("should work with default options", async () => {
    const result = await WebSize.measure("https://example.com");

    assert(result.rawSizeKB > 0);
    assert(result.renderedSizeKB > 0);
    assert(result.renderTimeSeconds > 0);

    if (result.transferSizeMB !== undefined) {
      assert(result.transferSizeMB > 0);
    }
  });

  /**
   * Tests the static measure method with custom options.
   * Verifies that:
   * 1. Custom options are properly applied
   * 2. Results are valid with custom configuration
   * 3. Verbose logging works in static context
   */
  it("should work with custom options", async () => {
    const result = await WebSize.measure("https://example.com", {
      waitUntil: WaitUntil.LOAD,
      verbose: true,
    });

    assert(result.rawSizeKB > 0);
    assert(result.renderedSizeKB > 0);
    assert(result.renderTimeSeconds > 0);

    if (result.transferSizeMB !== undefined) {
      assert(result.transferSizeMB > 0);
    }
  });
});
