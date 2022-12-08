<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/stores";
import type { ParameterArgs } from "@/data/types";
import DataForm from "@/components/DataForm.vue";
import DataViewer from "@/components/DataViewer.vue";

const { models, policies, options } = useStore();
const selectedModel = ref(models[0]);
const selectedPolicy = ref(policies[0]);

function makeParameter(args: ParameterArgs) {
  return {
    modelValue: args.value,
    ...args,
  };
}

const makeFormProps = computed(() => ({
  items: [
    {
      title: "Model",
      descBrief: "Environment from which actions are sampled",
      selectionItems: models,
      value: "model",
    },
    {
      title: "Policy",
      descBrief: "Strategy used when choosing the next action to sample",
      selectionItems: policies,
      value: "policy",
    },
    {
      title: "Options",
      descBrief: "Options regarding the data collection process",
      selectionItems: [{ parameters: options }],
      showSelection: false,
      value: "option",
    },
  ],
}));
</script>

<template>
  <DataForm v-bind="makeFormProps"> </DataForm>

  <DataViewer></DataViewer>
</template>
