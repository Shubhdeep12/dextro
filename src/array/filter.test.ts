import { describe, it, expect } from 'vitest';
import { filter } from './filter';

describe('filter', () => {
  it('should filter elements in forward direction', () => {
    const result = filter([1, 2, 3, 4, 5], x => x > 2);
    expect(result).toEqual([3, 4, 5]);
  });

  it('should filter elements in backward direction', () => {
    const result = filter([1, 2, 3, 4, 5], x => x > 2, { direction: 'backward' });
    expect(result).toEqual([5, 4, 3]);
  });

  it('should return empty array if no matches', () => {
    const result = filter([1, 2, 3], x => x > 5);
    expect(result).toEqual([]);
  });

  it('should handle empty arrays', () => {
    const result = filter([], x => x > 0);
    expect(result).toEqual([]);
  });

  it('should work with array-like objects', () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
    const result = filter(arrayLike, x => x > 1);
    expect(result).toEqual([2, 3]);
  });

  it('should throw for non-array-like input', () => {
    expect(() => filter(null as any, x => (x as number) > 0)).toThrow(TypeError);
  });

  it('should throw for non-function predicate', () => {
    expect(() => filter([1, 2, 3], 'not a function' as any)).toThrow(TypeError);
  });
});