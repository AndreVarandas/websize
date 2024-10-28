/**
 * This class is responsible for calculating the size of the page.
 */
export class SizeCalculator {
  /**
   * Calculates the size of the page in kilobytes.
   *
   * @param content - The content to calculate the size of.
   *
   * @returns The size of the page in kilobytes.
   */
  static calculateKilobytes(content: string): number {
    return new TextEncoder().encode(content).length / 1024;
  }
}
