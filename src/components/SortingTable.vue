<script setup lang="ts">
import IconBars from '@/components/icons/IconBars.vue';
import { computed, ref } from 'vue';
import draggable from 'vuedraggable';
export interface TableRow {
  email: string;
  potato: number;
  name: string;
}
const props = defineProps<{
  tableData: TableRow[];
}>();
const emit = defineEmits<{
  (e: 'update', value: TableRow[]): void;
}>();
const sortModel = computed({
  get: () => props.tableData,
  set: (value: TableRow[]) => {
    emit('update', value);
  },
});
const isDragging = ref(false);
</script>

<template>
  <div class="flex justify-between items-center gap-4 pl-5 pr-8 py-6">
    <p>Sort the table from most potatoes to least potatoes by dragging each row</p>
    <p class="font-bold text-base text-grayscale-100">{{ tableData.length }} people in the list</p>
  </div>
  <div class="max-w-full overflow-x-auto mb-20">
    <div class="w-full min-w-[800px]">
      <!-- Table header -->
      <div class="flex border-b border-t border-grayscale-600">
        <div class="w-1/3 px-5 py-4 text-base text-grayscale-300 border-r border-grayscale-600">
          Email
        </div>
        <div class="w-1/3 px-5 py-4 text-base text-grayscale-300">Potatoes</div>
        <div class="w-1/3 px-5 py-4 text-base text-grayscale-300">Full name</div>
      </div>
      <!-- Table body -->
      <draggable
        v-model="sortModel"
        tag="div"
        item-key="potato"
        handle=".handle"
        @start="isDragging = true"
        @end="isDragging = false"
        fallback-class="ps-table-draggable"
        :force-fallback="true"
        :scroll-sensitivity="200"
      >
        <template #item="{ element: row }">
          <div
            class="flex border-b border-grayscale-600 hover:bg-grayscale-800"
            :class="{ 'select-none': isDragging }"
          >
            <div
              class="w-1/3 flex gap-4 items-center px-5 py-4 text-base text-grayscale-100 border-r border-grayscale-600"
            >
              <icon-bars class="handle w-4 h-4 text-grayscale-300 hover:cursor-move" title="drag" />
              {{ row.email }}
            </div>
            <div class="w-1/3 px-5 py-4 text-base text-grayscale-100">{{ row.potato }}</div>
            <div class="w-1/3 px-5 py-4 text-base text-grayscale-100">{{ row.name }}</div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.ps-table-draggable * {
  border-right: 0;
}
</style>
