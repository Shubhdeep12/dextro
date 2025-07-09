import { describe, it, expect } from 'vitest';
import { some, every } from './some';

describe('some', () => {
  it('should return true if any element passes the test', () => {
    expect(some([1, 2, 3, 4], x => x > 3)).toBe(true);
  });

  it('should return false if no element passes the test', () => {
    expect(some([1, 2, 3, 4], x => x > 10)).toBe(false);
  });

  it('should handle empty arrays', () => {
    expect(some([], x => true)).toBe(false);
  });

  it('should work with array-like objects', () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
    expect(some(arrayLike, x => x === 2)).toBe(true);
  });

  it('should throw for non-array-like input', () => {
    expect(() => some(null as any, x => true)).toThrow(TypeError);
  });

  it('should throw for non-function predicate', () => {
    expect(() => some([1, 2, 3], 'not a function' as any)).toThrow(TypeError);
  });
});

describe('every', () => {
  it('should return true if all elements pass the test', () => {
    expect(every([2, 4, 6], x => x % 2 === 0)).toBe(true);
  });

  it('should return false if any element fails the test', () => {
    expect(every([2, 3, 4], x => x % 2 === 0)).toBe(false);
  });

  it('should handle empty arrays', () => {
    expect(every([], x => false)).toBe(true);
  });

  it('should work with array-like objects', () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
    expect(every(arrayLike, x => typeof x === 'number')).toBe(true);
  });

  it('should throw for non-array-like input', () => {
    expect(() => every(null as any, x => true)).toThrow(TypeError);
  });

  it('should throw for non-function predicate', () => {
    expect(() => every([1, 2, 3], 'not a function' as any)).toThrow(TypeError);
  });
}); 