/**
 * SizeCalculator provides utilities for calculating content sizes.
 * It handles conversion of string content to byte measurements.
 *
 * @example
 * ```typescript
 * const htmlContent = "<html><body>Hello World</body></html>";
 * const sizeKB = SizeCalculator.calculateKilobytes(htmlContent);
 * console.log(`Content size: ${sizeKB} KB`);
 * ```
 */
export class SizeCalculator {
  /**
   * Calculates the size of string content in kilobytes.
   * Uses TextEncoder to get accurate byte size of UTF-8 encoded content.
   *
   * @param content - The string content to measure (typically HTML)
   * @returns The size of the content in kilobytes (KB)
   *
   * @example
   * ```typescript
   * // Calculate size of HTML content
   * const size = SizeCalculator.calculateKilobytes("<html>...</html>");
   * console.log(`Page size: ${size.toFixed(2)} KB`);
   *
   * // Calculate size of rendered content
   * const renderedSize = SizeCalculator.calculateKilobytes(
   *   document.documentElement.outerHTML
   * );
   * ```
   */
  static calculateKilobytes(content: string): number {
    // Convert string to bytes using TextEncoder
    const bytes = new TextEncoder().encode(content).length;

    // Convert bytes to kilobytes
    return bytes / 1024;
  }
}
