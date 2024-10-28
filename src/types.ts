export interface PageSizeResult {
  rawSizeKB: number;
  renderedSizeKB: number;
  renderTimeSeconds: number;
  transferSizeMB?: number;
}

export enum WaitUntil {
  LOAD = "load",
  NONE = "none",
  NETWORK_IDLE_0 = "networkidle0",
  NETWORK_IDLE_2 = "networkidle2",
}

export interface WebSizeOptions {
  userAgent?: string;
  waitUntil?: WaitUntil;
  verbose?: boolean;
}

export interface LogConfig {
  url: string;
  rawSizeKB: number;
  renderedSizeKB: number;
  renderTimeSeconds: number;
  transferSizeMB?: number;
}
