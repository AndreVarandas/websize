# WebSize

![Deno](https://img.shields.io/badge/Deno-000000?style=for-the-badge&logo=deno&logoColor=white)

⚖ A library for measuring webpage sizes and render times.

![Logo](./extra/logo.webp)

This library uses [https://deno.land/x/astral@0.3.5](https://deno.land/x/astral@0.3.5) as a headless browser.

I needed a way to measure the size of a webpage, when using a headless browser. This way I can measure how much resources the requested page needs.

## Example

Please refer to the [example.ts](./example.ts) file.

You can run the example with:

```bash
deno run example
```

## Usage

```typescript
import { WebSize } from "jsr:@varandas/websize";

// Quick usage with static method
const result = await WebSize.measure("https://example.com");
console.log(result);

// With options
const result = await WebSize.measure("https://example.com", {
  waitUntil: "networkidle2",
  verbose: true,
});

// Using the class for multiple measurements
const webSize = new WebSize({
  verbose: true,
});
const result = await webSize.calculatePageSize("https://example.com");
```

## API

### Options

- `userAgent`: Custom user agent string (defaults to Chrome/122)
- `waitUntil`: Page load condition ('load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2')
- `verbose`: Enable console logging

### Result

```typescript
interface PageSizeResult {
  rawSizeKB: number; // Size of raw HTML
  renderedSizeKB: number; // Size after JavaScript execution
  renderTimeSeconds: number; // Total processing time
  transferSizeMB: number; // Network transfer size
}
```

## License

[MIT - André Varandas](LICENSE)
