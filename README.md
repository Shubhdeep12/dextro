# dextro

A minimal collection of high-performance, flexible array utilities for TypeScript/JavaScript. Supports advanced traversal options, including forward and backward (reverse) iteration.

## Installation

```sh
pnpm add dextro
# or
yarn add dextro
# or
npm install dextro
```

## Features
- High-performance, type-safe array utilities
- Supports array-like objects
- **Bidirectional traversal**: All utilities support `direction: 'forward' | 'backward'` for flexible iteration

## Usage Examples

### Filter (with direction)
```ts
import { filter } from 'dextro';

// Forward (default)
const result = filter([1, 2, 3, 4], x => x > 2);
console.log(result); // [3, 4]

// Backward (reverse)
const reversed = filter([1, 2, 3, 4], x => x > 2, { direction: 'backward' });
console.log(reversed); // [4, 3]
```

### Map (with direction)
```ts
import { map } from 'dextro';

const doubled = map([1, 2, 3], x => x * 2);
console.log(doubled); // [2, 4, 6]

const reversed = map([1, 2, 3], x => x * 2, { direction: 'backward' });
console.log(reversed); // [6, 4, 2]
```

### Reduce (with direction)
```ts
import { reduce } from 'dextro';

const sum = reduce([1, 2, 3, 4], (acc, x) => acc + x, 0);
console.log(sum); // 10

const reversedSum = reduce([1, 2, 3, 4], (acc, x) => acc + x, 0, { direction: 'backward' });
console.log(reversedSum); // 10
```

### Find (with direction)
```ts
import { find } from 'dextro';

const found = find([1, 2, 3, 4], x => x % 2 === 0);
console.log(found); // 2

const foundBackward = find([1, 2, 3, 4], x => x % 2 === 0, { direction: 'backward' });
console.log(foundBackward); // 4
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements or bug fixes.

## License

MIT

