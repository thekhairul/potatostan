<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
const props = defineProps<{
  minutes: number;
}>();
const emit = defineEmits<{
  (e: 'finish'): void;
}>();

const timeLeft = ref(Math.ceil(props.minutes) * 60); // time left in seconds
const timeTaken = ref(0); // time taken in seconds
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60);
  const seconds = timeLeft.value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

const startCountdown = () => {
  intervalId.value = setInterval(() => {
    if (timeLeft.value === 0) {
      clearInterval(intervalId.value!);
      emit('finish');
    } else {
      timeLeft.value--;
      timeTaken.value++;
    }
  }, 1000);
};

const stopCountdown = () => {
  if (intervalId.value) clearInterval(intervalId.value);
};

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  stopCountdown();
});
</script>

<template>
  <div class="font-bold text-2xl text-grayscale-100">{{ formattedTime }}</div>
</template>
