/**
 * The result of the page size calculation.
 */
export interface PageSizeResult {
  rawSizeKB: number;
  renderedSizeKB: number;
  renderTimeSeconds: number;
  transferSizeMB?: number;
}

/**
 * The wait until options for the browser.
 */
export enum WaitUntil {
  LOAD = "load",
  NONE = "none",
  NETWORK_IDLE_0 = "networkidle0",
  NETWORK_IDLE_2 = "networkidle2",
}

/**
 * The options for the WebSize class.
 */
export interface WebSizeOptions {
  userAgent?: string;
  waitUntil?: WaitUntil;
  verbose?: boolean;
}

/**
 * The configuration for the log results.
 */
export interface LogConfig {
  url: string;
  rawSizeKB: number;
  renderedSizeKB: number;
  renderTimeSeconds: number;
  transferSizeMB?: number;
}
