import { BidirectionalIterator } from '../internal/iterator';
import type { TraversalOptions, PredicateFunction } from '../internal/types';
import { isArrayLike, toArray } from '../internal/utils';

/**
 * Tests whether at least one element passes the predicate test.
 * Supports bidirectional traversal with early termination.
 * 
 * @param array - The array to test
 * @param predicate - Function to test each element
 * @param options - Traversal options
 * @returns True if any element passes the test, false otherwise
 * 
 * @example
 * ```typescript
 * some([1, 2, 3, 4], x => x > 3); // true
 * some([1, 2, 3, 4], x => x > 5); // false
 * ```
 */
export function some<T>(
  array: ArrayLike<T>,
  predicate: PredicateFunction<T>,
  options: TraversalOptions = {}
): boolean {
  if (!isArrayLike(array)) {
    throw new TypeError('Expected an array-like object');
  }

  if (typeof predicate !== 'function') {
    throw new TypeError('Expected predicate to be a function');
  }

  const arr = toArray(array);
  const iterator = new BidirectionalIterator(arr, options);
  
  while (iterator.hasNext()) {
    const item = iterator.next();
    if (item && predicate(item.value, item.index, arr)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Tests whether all elements pass the predicate test.
 * Supports bidirectional traversal with early termination.
 * 
 * @param array - The array to test
 * @param predicate - Function to test each element
 * @param options - Traversal options
 * @returns True if all elements pass the test, false otherwise
 */
export function every<T>(
  array: ArrayLike<T>,
  predicate: PredicateFunction<T>,
  options: TraversalOptions = {}
): boolean {
  if (!isArrayLike(array)) {
    throw new TypeError('Expected an array-like object');
  }

  if (typeof predicate !== 'function') {
    throw new TypeError('Expected predicate to be a function');
  }

  const arr = toArray(array);
  const iterator = new BidirectionalIterator(arr, options);
  
  while (iterator.hasNext()) {
    const item = iterator.next();
    if (item && !predicate(item.value, item.index, arr)) {
      return false;
    }
  }
  
  return true;
}