<script setup lang="ts">
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

const inputVariants = cva(
  'min-w-20 w-full rounded-md bg-white text-black border border-grayscale-500 appearance-none outline-none focus:outline-none placeholder:text-grayscale-500',
  {
    variants: {
      size: {
        default: 'p-3 text-sm',
        sm: 'px-3 py-2',
        lg: 'px-5 py-4 text-lg',
      },
      invalid: {
        true: 'border-error',
        false: '',
      },
      disabled: {
        true: 'cursor-not-allowed opacity-50',
        false: '',
      },
      readonly: {
        true: 'cursor-default',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      invalid: false,
      disabled: false,
      readonly: false,
    },
  },
);

interface InputProps {
  size?: 'default' | 'sm' | 'lg';
  invalid?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
}

const props = withDefaults(defineProps<InputProps>(), {
  size: 'default',
  invalid: false,
  disabled: false,
  readonly: false,
  placeholder: '',
});

const model = defineModel();

const inputClass = computed(() => {
  return cn(
    inputVariants({
      size: props.size,
      invalid: props.invalid,
      disabled: props.disabled,
      readonly: props.readonly,
    }),
  );
});
</script>

<template>
  <input
    :class="inputClass"
    :readonly="readonly"
    v-model="model"
    :disabled="disabled"
    :placeholder="placeholder"
    :aria-invalid="props.invalid"
    :aria-disabled="props.disabled"
    :aria-readonly="props.readonly"
  />
</template>
