/**
 * Represents the complete measurement results for a webpage.
 */
export interface PageSizeResult {
  /** Size of the raw HTML content in kilobytes */
  rawSizeKB: number;
  /** Size of the rendered page content in kilobytes after JavaScript execution */
  renderedSizeKB: number;
  /** Total time taken to render the page in seconds */
  renderTimeSeconds: number;
  /** Network transfer size in megabytes (if available) */
  transferSizeMB?: number;
}

/**
 * Defines when the page load is considered complete.
 */
export enum WaitUntil {
  /** Wait until the load event is fired */
  LOAD = "load",
  /** Don't wait for any events */
  NONE = "none",
  /** Wait until there are no network connections for at least 500ms */
  NETWORK_IDLE_0 = "networkidle0",
  /** Wait until there are no more than 2 network connections for at least 500ms */
  NETWORK_IDLE_2 = "networkidle2",
}

/**
 * Configuration options for the WebSize class.
 */
export interface WebSizeOptions {
  /** Custom user agent string to use for requests */
  userAgent?: string;
  /** Condition to determine when page load is complete */
  waitUntil?: WaitUntil;
  /** Enable detailed console logging */
  verbose?: boolean;
}

/**
 * Configuration for logging measurement results.
 */
export interface LogConfig {
  /** URL of the measured page */
  url: string;
  /** Size of raw HTML in kilobytes */
  rawSizeKB: number;
  /** Size of rendered content in kilobytes */
  renderedSizeKB: number;
  /** Time taken to render in seconds */
  renderTimeSeconds: number;
  /** Network transfer size in megabytes (if available) */
  transferSizeMB?: number;
}
