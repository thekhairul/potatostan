<script setup lang="ts">
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { computed } from 'vue';

const buttonVariants = cva(
  'inline-flex gap-1 justify-center items-center rounded-md transition-colors focus:outline-none font-bold text-base',
  {
    variants: {
      variant: {
        default: 'bg-grayscale-700 text-grayscale-300 hover:bg-grayscale-800',
        primary: 'bg-primary text-white hover:bg-primary-hover',
        secondary: 'bg-secondary text-white hover:bg-secondary-hover',
      },
      size: {
        default: 'px-5 py-3 text-base',
        sm: 'px-3 py-2',
        lg: 'px-9 py-4 text-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
  loading: false,
});

const buttonClass = computed(() => {
  return cn(buttonVariants({ variant: props.variant, size: props.size }), {
    'opacity-50 cursor-not-allowed': props.disabled,
    'cursor-wait': props.loading,
  });
});
</script>

<template>
  <button
    :class="buttonClass"
    :disabled="props.disabled"
    :aria-disabled="props.disabled"
    :aria-busy="props.loading"
  >
    <template v-if="props.loading">
      <slot name="loadingIcon"></slot>
    </template>
    <template v-else>
      <slot name="prependIcon"></slot>
      <slot>Button</slot>
      <slot name="appendIcon"></slot>
    </template>
  </button>
</template>
