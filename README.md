# dextro

A minimal collection of high-performance, flexible array utilities for TypeScript/JavaScript.

## Installation

```sh
pnpm add dextro
# or
yarn add dextro
# or
npm install dextro
```

## Usage Examples

### Filter
```ts
import { filter } from 'dextro';
const result = filter([1, 2, 3, 4], x => x > 2);
console.log(result); // [3, 4]
```

### Map
```ts
import { map } from 'dextro';
const doubled = map([1, 2, 3], x => x * 2);
console.log(doubled); // [2, 4, 6]
```

### Reduce
```ts
import { reduce } from 'dextro';
const sum = reduce([1, 2, 3, 4], (acc, x) => acc + x, 0);
console.log(sum); // 10
```

### Find
```ts
import { find } from 'dextro';
const found = find([1, 2, 3, 4], x => x % 2 === 0);
console.log(found); // 2
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements or bug fixes.

