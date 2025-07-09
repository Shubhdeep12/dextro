export type TraverseDirection = 'forward' | 'backward';

export interface TraversalOptions {
  readonly direction?: TraverseDirection;
  readonly startIndex?: number;
  readonly endIndex?: number;
}

export interface PredicateFunction<T> {
  (value: T, index: number, array: readonly T[]): boolean;
}

export interface MapFunction<T, R> {
  (value: T, index: number, array: readonly T[]): R;
}

export interface ReduceFunction<T, R> {
  (accumulator: R, currentValue: T, index: number, array: readonly T[]): R;
}
