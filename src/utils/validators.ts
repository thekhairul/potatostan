export function required(value: string) {
  return value ? null : 'This field is required';
}

export function range(min: number, max: number) {
  return (value: string) => {
    const numberValue = parseInt(value, 10);
    if (isNaN(numberValue) || numberValue < min || numberValue > max) {
      return `Value must be between ${min} and ${max}`;
    }
    return null;
  };
}
