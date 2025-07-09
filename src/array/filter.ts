import { BidirectionalIterator } from '../internal/iterator';
import type { TraversalOptions, PredicateFunction } from '../internal/types';
import { isArrayLike, toArray } from '../internal/utils';

/**
 * Creates a new array with all elements that pass the predicate test.
 * Supports bidirectional traversal.
 * 
 * @param array - The array to filter
 * @param predicate - Function to test each element
 * @param options - Traversal options
 * @returns New array with filtered elements
 * 
 * @example
 * ```typescript
 * filter([1, 2, 3, 4], x => x > 2); // [3, 4]
 * filter([1, 2, 3, 4], x => x > 2, { direction: 'backward' }); // [4, 3]
 * ```
 */
export function filter<T>(
  array: ArrayLike<T>,
  predicate: PredicateFunction<T>,
  options: TraversalOptions = {}
): T[] {
  if (!isArrayLike(array)) {
    throw new TypeError('Expected an array-like object');
  }

  if (typeof predicate !== 'function') {
    throw new TypeError('Expected predicate to be a function');
  }

  const arr = toArray(array);
  const result: T[] = [];
  const iterator = new BidirectionalIterator(arr, options);
  
  while (iterator.hasNext()) {
    const item = iterator.next();
    if (item && predicate(item.value, item.index, arr)) {
      result.push(item.value);
    }
  }
  
  return result;
}