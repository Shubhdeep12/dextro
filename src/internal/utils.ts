export function isArrayLike<T>(value: unknown): value is ArrayLike<T> {
  return value != null && 
         typeof value === 'object' && 
         typeof (value as ArrayLike<T>).length === 'number' &&
         (value as ArrayLike<T>).length >= 0 &&
         (value as ArrayLike<T>).length % 1 === 0;
}

export function toArray<T>(value: ArrayLike<T>): T[] {
  if (Array.isArray(value)) return value;
  return Array.from(value);
}