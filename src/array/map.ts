import { BidirectionalIterator } from '../internal/iterator';
import type { TraversalOptions, MapFunction } from '../internal/types';
import { isArrayLike, toArray } from '../internal/utils';

/**
 * Creates a new array with the results of calling the mapper function on every element.
 * Supports bidirectional traversal.
 * 
 * @param array - The array to map
 * @param mapper - Function to transform each element
 * @param options - Traversal options
 * @returns New array with transformed elements
 * 
 * @example
 * ```typescript
 * map([1, 2, 3], x => x * 2); // [2, 4, 6]
 * map([1, 2, 3], x => x * 2, { direction: 'backward' }); // [6, 4, 2]
 * ```
 */
export function map<T, R>(
  array: ArrayLike<T>,
  mapper: MapFunction<T, R>,
  options: TraversalOptions = {}
): R[] {
  if (!isArrayLike(array)) {
    throw new TypeError('Expected an array-like object');
  }

  if (typeof mapper !== 'function') {
    throw new TypeError('Expected mapper to be a function');
  }

  const arr = toArray(array);
  const result: R[] = [];
  const iterator = new BidirectionalIterator(arr, options);
  
  while (iterator.hasNext()) {
    const item = iterator.next();
    if (item) {
      result.push(mapper(item.value, item.index, arr));
    }
  }
  
  return result;
}