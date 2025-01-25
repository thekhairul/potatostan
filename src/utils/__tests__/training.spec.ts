import { describe, expect, it } from 'vitest';
import { generatePeople, randomizeArray } from '../training';

describe('Training Utilities', () => {
  describe('randomizeArray', () => {
    it('should return an array with the same elements in a different order', () => {
      const array = [1, 2, 3, 4, 5];
      const randomizedArray = randomizeArray(array);
      expect(randomizedArray).toHaveLength(array.length);
      expect(randomizedArray).toEqual(expect.arrayContaining(array));
      expect(randomizedArray).not.toEqual(array);
    });
  });

  describe('generatePeople', () => {
    it('should generate the specified number of people with unique names and emails', () => {
      const count = 5;
      const people = generatePeople(count);
      expect(people).toHaveLength(count);
      const names = people.map((person) => person.name);
      const emails = people.map((person) => person.email);
      expect(new Set(names).size).toBe(count);
      expect(new Set(emails).size).toBe(count);
    });

    it('should assign a unique potato number to each person', () => {
      const count = 5;
      const people = generatePeople(count);
      const potatoes = people.map((person) => person.potato);
      expect(new Set(potatoes).size).toBe(count);
    });
  });
});
