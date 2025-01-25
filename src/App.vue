<script setup lang="ts">
import StartSortingBtn from '@/components/StartSortingBtn.vue';
import { ref } from 'vue';

// types
enum Status {
  Start = 'START',
  Training = 'TRAINING',
  Success = 'SUCCESS',
  Fail = 'FAIL',
}
// data
const status = ref<Status>(Status.Start);
const notice = ref(
  "Welcome to Potatostan. Start training by clicking the button above. Let's make Potatostan great again!",
);
const totalPeople = ref(0);
// methods
const startTraining = (total: number) => {
  status.value = Status.Training;
  totalPeople.value = total;
};
</script>

<template>
  <header class="container flex justify-between items-center gap-4 mx-auto mb-9">
    <h1 class="text-2xl font-bold">Sorting Training System</h1>
    <nav>
      <start-sorting-btn @start="startTraining" />
    </nav>
  </header>
  <main class="container mx-auto">
    <section
      class="bg-white rounded-md shadow-default border border-grayscale-600" :class="{ 'h-96': status !== Status.Training }">
      <div class="w-full h-full flex flex-col items-center justify-center">
        <p class="text-lg max-w-96 text-center">{{ notice }}</p>
      </div>
    </section>
  </main>
</template>
