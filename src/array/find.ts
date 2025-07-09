import { isArrayLike, toArray } from '../internal/utils';
import { BidirectionalIterator } from '../internal/iterator';
import type { TraversalOptions, PredicateFunction } from '../internal/types';

/**
 * Finds the first element in the array that satisfies the predicate function.
 * Supports bidirectional traversal.
 * 
 * @param array - The array to search
 * @param predicate - Function to test each element
 * @param options - Traversal options
 * @returns The first element that matches the predicate, or undefined
 * 
 * @example
 * ```typescript
 * find([1, 2, 3, 4], x => x > 2); // 3
 * find([1, 2, 3, 4], x => x > 2, { direction: 'backward' }); // 4
 * ```
 */
export function find<T>(
  array: ArrayLike<T>,
  predicate: PredicateFunction<T>,
  options: TraversalOptions = {}
): T | undefined {
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
      return item.value;
    }
  }
  
  return undefined;
}

/**
 * Finds the index of the first element that satisfies the predicate function.
 * Supports bidirectional traversal.
 * 
 * @param array - The array to search
 * @param predicate - Function to test each element
 * @param options - Traversal options
 * @returns The index of the first element that matches, or -1
 */
export function findIndex<T>(
  array: ArrayLike<T>,
  predicate: PredicateFunction<T>,
  options: TraversalOptions = {}
): number {
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
      return item.index;
    }
  }
  
  return -1;
}