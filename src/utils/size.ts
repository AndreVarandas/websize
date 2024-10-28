export class SizeCalculator {
  static calculateKilobytes(content: string): number {
    return new TextEncoder().encode(content).length / 1024;
  }
}
