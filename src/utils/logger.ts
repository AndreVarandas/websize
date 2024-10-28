import type { LogConfig } from "../types.ts";

export class Logger {
  static logResults(config: LogConfig) {
    const {
      url,
      rawSizeKB,
      renderedSizeKB,
      renderTimeSeconds,
      transferSizeMB,
    } = config;

    console.log(`Raw HTML size for ${url}: ${rawSizeKB.toFixed(2)} KB`);
    console.log(`Rendered size for ${url}: ${renderedSizeKB.toFixed(2)} KB`);

    if (transferSizeMB) {
      console.log(`Transfer size: ${transferSizeMB.toFixed(2)} MB`);
    }

    console.log(`Render time: ${renderTimeSeconds.toFixed(2)} seconds`);
  }
}
