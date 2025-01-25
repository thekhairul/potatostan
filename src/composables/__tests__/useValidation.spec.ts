import useValidation from '@/composables/useValidation';
import { range, required } from '@/utils/validators';
import { describe, expect, it } from 'vitest';
import { ref } from 'vue';

describe('useValidation', () => {
  it('should validate required field', () => {
    const value = ref('');
    const { validate } = useValidation(value, [required]);

    expect(validate()).toBe('This field is required');

    value.value = 'value';
    expect(validate()).toBe(null);
  });

  it('should validate range', () => {
    const value = ref('');
    const { validate } = useValidation(value, [range(1, 10)]);

    value.value = '0';
    expect(validate()).toBe('Value must be between 1 and 10');

    value.value = '5';
    expect(validate()).toBe(null);

    value.value = '11';
    expect(validate()).toBe('Value must be between 1 and 10');

    value.value = 'abc';
    expect(validate()).toBe('Value must be between 1 and 10');
  });
});
