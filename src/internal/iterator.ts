import type { TraversalOptions, TraverseDirection } from './types';

export class BidirectionalIterator<T> {
  private readonly array: readonly T[];
  private currentIndex: number;
  private readonly direction: TraverseDirection;
  private readonly startIndex: number;
  private readonly endIndex: number;

  constructor(array: readonly T[], options: TraversalOptions = {}) {
    this.array = array;
    this.direction = options.direction ?? 'forward';
    
    if (this.direction === 'forward') {
      this.startIndex = options.startIndex ?? 0;
      this.endIndex = options.endIndex ?? array.length - 1;
    } else {
      this.startIndex = options.startIndex ?? array.length - 1;
      this.endIndex = options.endIndex ?? 0;
    }
    
    this.currentIndex = this.startIndex;
    this.validateIndices();
  }

  private validateIndices(): void {
    const len = this.array.length;
    if (len === 0) return;
    
    if (this.direction === 'forward') {
      if (this.startIndex < 0 || this.startIndex >= len) {
        throw new RangeError(`Start index ${this.startIndex} is out of bounds for array of length ${len}`);
      }
      if (this.endIndex < 0 || this.endIndex >= len) {
        throw new RangeError(`End index ${this.endIndex} is out of bounds for array of length ${len}`);
      }
      if (this.startIndex > this.endIndex) {
        throw new RangeError(`Start index ${this.startIndex} cannot be greater than end index ${this.endIndex} for forward traversal`);
      }
    } else {
      if (this.startIndex < 0 || this.startIndex >= len) {
        throw new RangeError(`Start index ${this.startIndex} is out of bounds for array of length ${len}`);
      }
      if (this.endIndex < 0 || this.endIndex >= len) {
        throw new RangeError(`End index ${this.endIndex} is out of bounds for array of length ${len}`);
      }
      if (this.startIndex < this.endIndex) {
        throw new RangeError(`Start index ${this.startIndex} cannot be less than end index ${this.endIndex} for backward traversal`);
      }
    }
  }

  hasNext(): boolean {
    if (this.array.length === 0) return false;
    
    if (this.direction === 'forward') {
      return this.currentIndex <= this.endIndex;
    } else {
      return this.currentIndex >= this.endIndex;
    }
  }

  next(): { value: T; index: number } | null {
    if (!this.hasNext()) return null;

    const value = this.array[this.currentIndex];
    if (value === undefined) return null;
    
    const index = this.currentIndex;
    
    if (this.direction === 'forward') {
      this.currentIndex++;
    } else {
      this.currentIndex--;
    }
    
    return { value, index };
  }

  reset(): void {
    this.currentIndex = this.startIndex;
  }
}