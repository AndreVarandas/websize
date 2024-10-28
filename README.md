# WebSize 📏

![Deno](https://img.shields.io/badge/Deno-000000?style=for-the-badge&logo=deno&logoColor=white)
[![JSR Score](https://jsr.io/badges/@varandas/websize)](https://jsr.io/@varandas/websize)

A Deno library for measuring webpage sizes and render times. Get accurate measurements of:

- Raw HTML size
- Rendered page size (after JavaScript execution)
- Network transfer size
- Render time

## Features

- 🚀 Simple static method for quick measurements
- ⚙️ Configurable options for detailed control
- 📊 Detailed size metrics and timing
- 🌐 Supports custom user agents
- 🔄 Multiple wait conditions for accurate rendering
- 📝 Optional verbose logging

## Installation

```bash
# Import from JSR
import { WebSize } from "jsr:@varandas/websize";
```

## Quick Start

```typescript
// Quick single measurement
const result = await WebSize.measure("https://example.com");
console.log(result);
// {
//   rawSizeKB: 15.2,
//   renderedSizeKB: 25.7,
//   renderTimeSeconds: 1.2,
//   transferSizeMB: 0.35
// }
```

## Advanced Usage

### With Custom Options

```typescript
const result = await WebSize.measure("https://example.com", {
  waitUntil: "networkidle2", // Wait for network to be idle
  verbose: true, // Enable detailed logging
  userAgent: "Custom Agent", // Set custom user agent
});
```

### Multiple Measurements

```typescript
// Create a reusable instance
const webSize = new WebSize({
  verbose: true,
  waitUntil: "load",
});

// Measure multiple sites
const sites = ["https://deno.land", "https://example.com"];
for (const site of sites) {
  const result = await webSize.calculatePageSize(site);
  console.log(`${site}: ${result.renderedSizeKB}KB`);
}
```

## API Reference

### WebSize Class

#### Constructor Options

| Option      | Type        | Default        | Description               |
| ----------- | ----------- | -------------- | ------------------------- |
| `userAgent` | `string`    | Chrome/122...  | Browser user agent string |
| `waitUntil` | `WaitUntil` | `networkidle2` | Page load condition       |
| `verbose`   | `boolean`   | `false`        | Enable console logging    |

#### Wait Conditions

- `load`: Wait for load event
- `networkidle0`: No network connections for 500ms
- `networkidle2`: ≤ 2 network connections for 500ms
- `none`: Don't wait

### Result Object

```typescript
interface PageSizeResult {
  rawSizeKB: number; // Size of raw HTML
  renderedSizeKB: number; // Size after JavaScript
  renderTimeSeconds: number; // Processing time
  transferSizeMB: number; // Network transfer size
}
```

## Development

```bash
# Run tests
deno task test

# Run example
deno task example

# Type check
deno task check
```

## Under the Hood

WebSize uses [Astral](https://jsr.io/@astral/astral) as its headless browser engine to:

1. Fetch raw HTML content
2. Execute JavaScript
3. Measure rendered page size
4. Track network transfers

## License

[MIT License](LICENSE) - © André Varandas

---

Found a bug? [Open an issue](https://github.com/AndreVarandas/websize/issues)
