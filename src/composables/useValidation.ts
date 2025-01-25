import { ref, unref, watch, type Ref } from 'vue';

type ValidatorFn = (value: HTMLInputElement['value']) => string | null; // return error message or null

function useValidation(value: Ref<string>, rules: Array<ValidatorFn>) {
  const error = ref<string | null>(null);
  const validate = () => {
    for (const rule of rules) {
      const errMsg = rule(unref(value));
      if (errMsg) {
        error.value = errMsg;
        return false;
      }
    }
    error.value = null;
    return true;
  };

  watch(value, validate);

  return {
    error,
    validate,
  };
}

export default useValidation;
