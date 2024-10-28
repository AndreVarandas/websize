# WebSize

A library for measuring webpage sizes and render times.

## Usage

```typescript
import { measurePageSize } from "jsr:@varandas/websize";

// Quick usage
const result = await measurePageSize("https://example.com");
console.log(result);

// With options
const result = await measurePageSize("https://example.com", {
  waitUntil: "domcontentloaded",
  verbose: true,
});

// Using the class
import { WebSize } from "jsr:@varandas/websize";
const webSize = new WebSize({
  timeout: 30000,
  verbose: true,
});
const result = await webSize.calculatePageSize("https://example.com");
```

## API

### Options

- `userAgent`: Custom user agent string
- `timeout`: Maximum time to wait for page load (ms)
- `waitUntil`: Page load condition ('load' | 'none' | 'networkidle0' | 'networkidle2')
- `verbose`: Enable console logging

### Result

```typescript
interface PageSizeResult {
  rawSizeKB: number;
  renderedSizeKB: number;
  renderTimeSeconds: number;
}
```

# License

[MIT - André Varandas](LICENSE)
