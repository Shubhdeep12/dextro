import { describe, it, expect } from 'vitest';
import { reduce } from './reduce';

describe('reduce', () => {
  it('should reduce elements in forward direction', () => {
    const result = reduce([1, 2, 3, 4], (acc, x) => acc + x, 0);
    expect(result).toBe(10);
  });

  it('should reduce elements in backward direction', () => {
    const result = reduce([1, 2, 3, 4], (acc, x) => acc + x, 0, { direction: 'backward' });
    expect(result).toBe(10);
  });

  it('should handle empty arrays', () => {
    const result = reduce([], (acc, x) => acc + (x as number), 100);
    expect(result).toBe(100);
  });

  it('should work with array-like objects', () => {
    const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
    const result = reduce(arrayLike, (acc, x) => acc + x, 0);
    expect(result).toBe(6);
  });

  it('should throw for non-array-like input', () => {
    expect(() => reduce(null as any, (acc, x) => acc, 0)).toThrow(TypeError);
  });

  it('should throw for non-function reducer', () => {
    expect(() => reduce([1, 2, 3], 'not a function' as any, 0)).toThrow(TypeError);
  });

  it('should pass correct index and array to reducer', () => {
    const arr = [10, 20, 30];
    const indices: number[] = [];
    const arrays: number[][] = [];
    reduce(arr, (acc, v, i, a) => {
      indices.push(i);
      arrays.push(a as number[]);
      return acc + v;
    }, 0);
    expect(indices).toEqual([0, 1, 2]);
    expect(arrays[0]).toBe(arr);
  });
}); 