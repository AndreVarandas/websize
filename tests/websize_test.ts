import { assert, assertRejects } from "jsr:@std/assert";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { WebSize } from "../src/mod.ts";
import { WaitUntil } from "../src/types.ts";

describe("WebSize", () => {
  let websize: WebSize;

  beforeEach(() => {
    websize = new WebSize();
  });

  it("should measure page size for valid URLs", async () => {
    const result = await websize.calculatePageSize("https://example.com");

    assert(result.rawSizeKB > 0, "Raw size should be greater than 0");
    assert(result.renderedSizeKB > 0, "Rendered size should be greater than 0");
    assert(
      result.renderTimeSeconds > 0,
      "Render time should be greater than 0"
    );

    // Check transfer size if available
    if (result.transferSizeMB !== undefined) {
      assert(
        result.transferSizeMB > 0,
        "Transfer size should be greater than 0 when available"
      );
    }
  });

  it("should throw on invalid URLs", async () => {
    await assertRejects(
      () =>
        websize.calculatePageSize(
          "https://invalid-url-that-does-not-exist.com/"
        ),
      Error
    );
  });

  it("should accept custom options", async () => {
    const customWebSize = new WebSize({
      userAgent: "Custom User Agent",
      waitUntil: WaitUntil.LOAD,
      verbose: true,
    });

    const result = await customWebSize.calculatePageSize("https://example.com");
    assert(result.rawSizeKB > 0);
  });

  it("should include transfer size when available", async () => {
    const result = await websize.calculatePageSize("https://example.com");

    // Transfer size might be undefined if server doesn't send Content-Length
    if (result.transferSizeMB !== undefined) {
      assert(
        result.transferSizeMB > 0,
        "Transfer size should be greater than 0 when available"
      );
    }
  });
});

describe("measure static method", () => {
  it("should work with default options", async () => {
    const result = await WebSize.measure("https://example.com");

    assert(result.rawSizeKB > 0);
    assert(result.renderedSizeKB > 0);
    assert(result.renderTimeSeconds > 0);

    if (result.transferSizeMB !== undefined) {
      assert(result.transferSizeMB > 0);
    }
  });

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
