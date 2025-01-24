<script setup lang="ts">
import { onMounted, onUnmounted, watchEffect } from 'vue';
interface ModalProps {
  show: boolean;
  width?: string;
}
const props = withDefaults(defineProps<ModalProps>(), {
  show: false,
});
const emit = defineEmits(['close']);
const close = () => {
  emit('close');
};
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    close();
  }
};
onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});
watchEffect(() => {
  if (props.show) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <teleport to="body">
    <div class="ps-modal fixed inset-0 z-50 p-4 md:p-8 flex items-center justify-center" v-if="props.show">
      <div class="fixed inset-0 bg-gray-900 opacity-50" @click="close"></div>
      <div
        :style="{ width: props.width }"
        class="bg-white max-w-full rounded-md shadow-default z-10"
      >
        <div class="px-5 py-4 flex gap-2 justify-between border-b border-grayscale-500">
          <slot name="title">Modal</slot>
          <button @click="close" aria-label="Close modal">x</button>
        </div>
        <slot></slot>
        <div class="p-5 border-t border-grayscale-500" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>
