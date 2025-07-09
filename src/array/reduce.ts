import { BidirectionalIterator } from '../internal/iterator';
import type { TraversalOptions, ReduceFunction } from '../internal/types';
import { isArrayLike, toArray } from '../internal/utils';

/**
 * Reduces the array to a single value using the reducer function.
 * Supports bidirectional traversal.
 * 
 * @param array - The array to reduce
 * @param reducer - Function to reduce elements
 * @param initialValue - Initial value for the accumulator
 * @param options - Traversal options
 * @returns The reduced value
 * 
 * @example
 * ```typescript
 * reduce([1, 2, 3, 4], (acc, x) => acc + x, 0); // 10
 * reduce([1, 2, 3, 4], (acc, x) => acc + x, 0, { direction: 'backward' }); // 10
 * ```
 */
export function reduce<T, R>(
  array: ArrayLike<T>,
  reducer: ReduceFunction<T, R>,
  initialValue: R,
  options: TraversalOptions = {}
): R {
  if (!isArrayLike(array)) {
    throw new TypeError('Expected an array-like object');
  }

  if (typeof reducer !== 'function') {
    throw new TypeError('Expected reducer to be a function');
  }

  const arr = toArray(array);
  let accumulator = initialValue;
  const iterator = new BidirectionalIterator(arr, options);
  
  while (iterator.hasNext()) {
    const item = iterator.next();
    if (item) {
      accumulator = reducer(accumulator, item.value, item.index, arr);
    }
  }
  
  return accumulator;
}