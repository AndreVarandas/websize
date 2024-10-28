import { assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { measurePageSize } from "../src/mod.ts";

describe("Helper functions", () => {
  it("measurePageSize function should work", async () => {
    const result = await measurePageSize("https://example.com");
    assertEquals(typeof result.rawSizeKB, "number");
    assertEquals(typeof result.renderedSizeKB, "number");
    assertEquals(typeof result.renderTimeSeconds, "number");
  });
});
