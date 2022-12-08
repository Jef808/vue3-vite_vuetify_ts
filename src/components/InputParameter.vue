<script setup lang="ts">
import { ref, onMounted, unref } from "vue";

export interface Props {
  name: string;
  label: string;
  modelValue: number;
  min: number;
  max: number;
  step: number;
}
export interface Emits {
  (e: "update", value: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const value = ref(props.modelValue);

const onUpdate = () => emit("update", unref(value));

onMounted(() => {
  console.log(JSON.stringify(props));
});

const increment = () => {
  value.value = Math.min(value.value + props.step, props.max);
};
const decrement = () => {
  value.value = Math.max(value.value - props.step, props.min);
};
</script>

<template>
  <v-card variant="outlined">
    <v-card-title>
      <span class="subtitle-1 text-primary">{{ label }}</span>
      <v-text-field
        v-model="value"
        class="py-4"
        type="number"
        density="compact"
        hide-details
        variant="outlined"
      >
      </v-text-field>
    </v-card-title>
    <v-card-text>
      <v-slider
        v-model="value"
        track-color="grey"
        always-dirty
        :min="min"
        :max="max"
        :step="step"
      >
        <template v-slot:prepend>
          <v-icon @click="decrement"> mdi-minus </v-icon>
        </template>

        <template v-slot:append>
          <v-icon @click="increment"> mdi-plus </v-icon>
        </template>
        ></v-slider
      >
    </v-card-text>
  </v-card>
</template>
