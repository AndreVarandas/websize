import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { WebSize } from "../src/mod.ts";

describe("Helper functions", () => {
  it("measure static method should work", async () => {
    const result = await WebSize.measure("https://example.com");
    assertEquals(typeof result.rawSizeKB, "number");
    assertEquals(typeof result.renderedSizeKB, "number");
    assertEquals(typeof result.renderTimeSeconds, "number");
  });
});
