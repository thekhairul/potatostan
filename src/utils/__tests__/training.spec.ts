import { describe, expect, it } from 'vitest';
import { calculateScore, generatePeople, randomizeArray } from '../training';

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

  describe('calculateScore', () => {
    it('should return 0 if secondsTaken is 0', () => {
      const score = calculateScore(10, 0);
      expect(score).toBe(0);
    });

    it('should calculate the score correctly for given totalPeople and secondsTaken', () => {
      const score = calculateScore(10, 20);
      expect(score).toBeGreaterThan(50); // Base score is 50, so it should be greater
    });

    it('should return a higher score for more people sorted in less time', () => {
      const score1 = calculateScore(10, 20);
      const score2 = calculateScore(20, 20);
      expect(score2).toBeGreaterThan(score1);
    });

    it('should return a lower score for fewer people sorted in more time', () => {
      const score1 = calculateScore(10, 20);
      const score2 = calculateScore(10, 40);
      expect(score2).toBeLessThan(score1);
    });
  });
});
