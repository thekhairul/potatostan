import useValidation from '@/composables/useValidation';
import { range, required } from '@/utils/validators';
import { describe, expect, it } from 'vitest';
import { ref } from 'vue';

describe('useValidation', () => {
  it('should validate required field', () => {
    const value = ref('');
    const { error, validate } = useValidation(value, [required]);
    validate();
    expect(error.value).toBe('This field is required');

    value.value = 'value';
    validate();
    expect(error.value).toBe(null);
  });

  it('should validate range', () => {
    const value = ref('');
    const { error, validate } = useValidation(value, [range(1, 10)]);

    value.value = '0';
    validate();
    expect(error.value).toBe('Value must be between 1 and 10');

    value.value = '5';
    validate();
    expect(error.value).toBe(null);

    value.value = '11';
    validate();
    expect(error.value).toBe('Value must be between 1 and 10');

    value.value = 'abc';
    validate();
    expect(error.value).toBe('Value must be between 1 and 10');
  });
});
