import { describe, expect, it } from 'vitest';
import { range, required } from '../validators';

describe('validators', () => {
  describe('required', () => {
    it('should return null if value is provided', () => {
      expect(required('some value')).toBeNull();
    });

    it('should return error message if value is not provided', () => {
      expect(required('')).toBe('This field is required');
    });
  });

  describe('range', () => {
    const rangeValidator = range(1, 10);

    it('should return null if value is within range', () => {
      expect(rangeValidator('5')).toBeNull();
    });

    it('should return error message if value is below range', () => {
      expect(rangeValidator('0')).toBe('Value must be between 1 and 10');
    });

    it('should return error message if value is above range', () => {
      expect(rangeValidator('11')).toBe('Value must be between 1 and 10');
    });

    it('should return error message if value is not a number', () => {
      expect(rangeValidator('abc')).toBe('Value must be between 1 and 10');
    });
  });
});
