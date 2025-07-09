import { describe, it, expect } from 'vitest';
import { map } from './map';

describe('map', () => {
  it('should map elements in forward direction', () => {
    const result = map([1, 2, 3], x => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  it('should map elements in backward direction', () => {
    const result = map([1, 2, 3], x => x * 2, { direction: 'backward' });
    expect(result).toEqual([6, 4, 2]);
  });

  it('should handle empty arrays', () => {
    const result = map([], x => x);
    expect(result).toEqual([]);
  });

  it('should work with array-like objects', () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
    const result = map(arrayLike, x => x + 1);
    expect(result).toEqual([2, 3, 4]);
  });

  it('should throw for non-array-like input', () => {
    expect(() => map(null as any, x => x)).toThrow(TypeError);
  });

  it('should throw for non-function mapper', () => {
    expect(() => map([1, 2, 3], 'not a function' as any)).toThrow(TypeError);
  });

  it('should pass correct index and array to mapper', () => {
    const arr = [10, 20, 30];
    const indices: number[] = [];
    const arrays: number[][] = [];
    map(arr, (v, i, a) => {
      indices.push(i);
      arrays.push(a as number[]);
      return v;
    });
    expect(indices).toEqual([0, 1, 2]);
    expect(arrays[0]).toBe(arr);
  });
}); 