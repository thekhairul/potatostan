<script setup lang="ts">
import CountDown from '@/components/CountDown.vue';
import SortingTable, { type TableRow } from '@/components/SortingTable.vue';
import StartSortingBtn from '@/components/StartSortingBtn.vue';
import { calculateScore, generatePeople } from '@/utils/training';
import { ref, useTemplateRef, watch } from 'vue';

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
  "Welcome to Potatostan 👋. Start training by clicking the button above. Let's make Potatostan great again!",
);
const totalPeople = ref(0);
const trainingData = ref<TableRow[]>([]);
// refs
const timerRef = useTemplateRef('timer');
// methods
const startTraining = (total: number) => {
  resetData();
  status.value = Status.Training;
  totalPeople.value = total;
  trainingData.value = generatePeople(total);
};
const updateTrainingData = (data: TableRow[]) => {
  trainingData.value = data;
};
const handleTimeout = () => {
  status.value = Status.Fail;
  notice.value = 'Time is up! 🙁 You failed to sort the table in time. Try again!';
};
const handleSuccess = () => {
  status.value = Status.Success;
  const elapsedTime = timerRef.value?.timeTaken || 0;
  const score = calculateScore(totalPeople.value, elapsedTime);
  notice.value = `Congratulations! 🎉 You've successfully sorted the table in time. Your score is ${score}.`;
};
const resetData = () => {
  totalPeople.value = 0;
  trainingData.value = [];
}
// effects
watch(trainingData, (newData) => {
  const isSorted = newData.every((person, index, arr) => {
    if (index === 0) return true;
    return person.potato <= arr[index - 1].potato;
  });
  if (isSorted) handleSuccess();
});
</script>

<template>
  <header class="container flex justify-between items-center gap-4 mx-auto mb-9">
    <h1 class="text-2xl font-bold">Sorting Training System</h1>
    <nav>
      <count-down
        v-if="status === Status.Training"
        ref="timer"
        :minutes="(5 * totalPeople) / 20"
        @finish="handleTimeout"
      />
      <start-sorting-btn v-else @start="startTraining" />
    </nav>
  </header>
  <main class="container mx-auto">
    <section
      class="bg-white rounded-md shadow-default border border-grayscale-600" :class="{ 'h-96': status !== Status.Training }">
      <sorting-table
        v-if="status === Status.Training"
        :table-data="trainingData"
        @update="updateTrainingData"
      />
      <div v-else class="w-full h-full flex flex-col items-center justify-center">
        <p class="text-lg max-w-96 text-center">{{ notice }}</p>
      </div>
    </section>
  </main>
</template>
