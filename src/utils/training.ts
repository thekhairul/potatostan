export function randomizeArray<T>(array: T[]) {
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }
  return arrayCopy;
}

function getUniqueRandomNames(count: number) {
  const firstNames = [
    'John',
    'Jane',
    'Michael',
    'Emily',
    'David',
    'Sarah',
    'James',
    'Olivia',
    'William',
    'Emma',
  ];
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Jones',
    'Brown',
    'Davis',
    'Miller',
    'Wilson',
    'Moore',
    'Taylor',
  ];

  const allPossibleNames = [];
  for (const firstName of firstNames) {
    for (const lastName of lastNames) {
      allPossibleNames.push(`${firstName} ${lastName}`);
    }
  }

  const randomNames = randomizeArray(allPossibleNames);
  return randomNames.slice(0, count);
}

export function generatePeople(count: number) {
  const people = [];
  const names = getUniqueRandomNames(count);
  const potatoes = randomizeArray(Array.from({ length: count }, (_, i) => i + 1));

  for (let i = 0; i < count; i++) {
    const name = names[i];
    const potato = potatoes[i];
    const email = `${name.toLowerCase().replace(/\s/g, '.')}@example.com`;
    people.push({ name, potato, email });
  }

  return people;
}

export function calculateScore(totalPeople: number, secondsTaken: number) {
  if (secondsTaken === 0) return 0; // Avoid division by zero

  const baseScore = 50; // Base score to ensure non-zero scores
  const efficiencyFactor = (totalPeople / secondsTaken) * 100;
  const score = Math.round(baseScore + efficiencyFactor);

  return score;
}