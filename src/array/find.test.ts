import { describe, it, expect } from 'vitest';
import { find, findIndex } from './find';

describe('find', () => {
  it('should find element in forward direction', () => {
    const result = find([1, 2, 3, 4, 5], x => x > 3);
    expect(result).toBe(4);
  });

  it('should find element in backward direction', () => {
    const result = find([1, 2, 3, 4, 5], x => x > 3, { direction: 'backward' });
    expect(result).toBe(5);
  });

  it('should return undefined if not found', () => {
    const result = find([1, 2, 3], x => x > 5);
    expect(result).toBeUndefined();
  });

  it('should work with array-like objects', () => {
    const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };
    const result = find(arrayLike, x => x === 'b');
    expect(result).toBe('b');
  });

  it('should handle empty arrays', () => {
    const result = find([], x => x > 0);
    expect(result).toBeUndefined();
  });

  it('should throw for non-array-like input', () => {
    expect(() => find(null as any, x => (x as number) > 0)).toThrow(TypeError);
    expect(() => find(undefined as any, x => (x as number) > 0)).toThrow(TypeError);
  });

  it('should throw for non-function predicate', () => {
    expect(() => find([1, 2, 3], 'not a function' as any)).toThrow(TypeError);
  });

  it('should work with custom range', () => {
    const result = find([1, 2, 3, 4, 5], x => x > 2, { startIndex: 1, endIndex: 3 });
    expect(result).toBe(3);
  });
});

describe('findIndex', () => {
  it('should find index in forward direction', () => {
    const result = findIndex([1, 2, 3, 4, 5], x => x > 3);
    expect(result).toBe(3);
  });

  it('should find index in backward direction', () => {
    const result = findIndex([1, 2, 3, 4, 5], x => x > 3, { direction: 'backward' });
    expect(result).toBe(4);
  });

  it('should return -1 if not found', () => {
    const result = findIndex([1, 2, 3], x => x > 5);
    expect(result).toBe(-1);
  });

  it('should handle empty arrays', () => {
    const result = findIndex([], x => x > 0);
    expect(result).toBe(-1);
  });
});
