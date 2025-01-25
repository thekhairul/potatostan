<script setup lang="ts">
import CountDown from '@/components/CountDown.vue';
import SortingTable, { type TableRow } from '@/components/SortingTable.vue';
import StartSortingBtn from '@/components/StartSortingBtn.vue';
import { generatePeople } from '@/utils/training';
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
const trainingData = ref<TableRow[]>([]);
// methods
const startTraining = (total: number) => {
  status.value = Status.Training;
  totalPeople.value = total;
  trainingData.value = generatePeople(total);
};
const updateTrainingData = (data: TableRow[]) => {
  trainingData.value = data;
};
const handleTimeout = () => {
  status.value = Status.Fail;
  totalPeople.value = 0;
  trainingData.value = [];
  notice.value = 'Time is up! You failed to sort the table in time. Try again!';
};
</script>

<template>
  <header class="container flex justify-between items-center gap-4 mx-auto mb-9">
    <h1 class="text-2xl font-bold">Sorting Training System</h1>
    <nav>
      <count-down
        v-if="status === Status.Training"
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
