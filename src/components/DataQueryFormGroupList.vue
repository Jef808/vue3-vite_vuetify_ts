<script setup lang="ts">
import { ref, computed } from "vue";
import DataQueryFormGroup, {
  type Props as GroupProps,
} from "@/components/DataQueryFormGroup.vue";
import type { Model, Policy, Options } from "@/data/types";

export type NamedValue = { name: string; value: number };

interface Props {
  models: GroupProps;
  policies: GroupProps;
  options: GroupProps;
}

function onUpdateModel(
  modelName: string,
  parameters: { name: string; value: number }[]
) {
  console.log("Updated model", modelName, parameters);
}

function onUpdatePolicy(
  policyName: string,
  parameters: { name: string; value: number }[]
) {
  console.log("Updated policy", policyName, parameters);
}

function onUpdateOptions(
  optionsName: string,
  parameters: { name: string; value: number }[]
) {
  console.log("Updated options", parameters);
}

const props = defineProps<Props>();
</script>

<template>
  <v-container>
    <v-expansion-panels variant="accordion">
      <DataQueryFormGroup
        v-bind="models"
        @update="onUpdateModel"
      ></DataQueryFormGroup>
      <DataQueryFormGroup
        v-bind="policies"
        @update="onUpdatePolicy"
      ></DataQueryFormGroup>
      <DataQueryFormGroup
        v-bind="options"
        @update="onUpdateOptions"
      ></DataQueryFormGroup>
    </v-expansion-panels>
  </v-container>
</template>
