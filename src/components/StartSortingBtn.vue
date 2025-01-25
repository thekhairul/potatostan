<script setup lang="ts">
import PsButton from '@/components/ui/PsButton.vue';
import PsInput from '@/components/ui/PsInput.vue';
import PsModal from '@/components/ui/PsModal.vue';
import useValidation from '@/composables/useValidation';
import { range, required } from '@/utils/validators';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'start', totalPeople: number): void;
}>();
const isOpen = ref(false);
const totalPeople = ref('');
const { error, validate } = useValidation(totalPeople, [required, range(20, 100)]);

const startSorting = () => {
  const isValid = validate();
  if (!isValid) return;
  emit('start', Number(totalPeople.value));
  isOpen.value = false;
};
</script>

<template>
  <ps-button variant="primary" size="lg" @click="isOpen = true">Start sorting!</ps-button>

  <ps-modal :show="isOpen" @close="isOpen = false" width="440px">
    <template #title>
      <h3 class="text-lg font-bold">How many people?</h3>
    </template>
    <div class="p-5 min-h-36">
      <label for="total-people" class="text-sm text-grayscale-300 block mb-3"
        >Enter a number of how many people you want to add to the list.</label
      >
      <ps-input
        v-model="totalPeople"
        id="total-people"
        type="number"
        :invalid="Boolean(error)"
        @keypress.enter="startSorting"
      />
      <p class="text-error text-sm mt-1" v-if="error">{{ error }}</p>
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <ps-button @click="isOpen = false" data-testid="cancel-btn">Cancel</ps-button>
        <ps-button @click="startSorting" variant="primary" :disabled="Boolean(error)" data-testid="start-btn">Start</ps-button>
      </div>
    </template>
  </ps-modal>
</template>
