<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/stores";
import type { Model, Policy, Options } from "@/data/types";
import DataQueryFormGroupList from "@/components/DataQueryFormGroupList.vue";
import BarChart from "@/components/BarChart.vue";
import fetchMockData from "@/scripts/fetchMockData";

const { models, policies, options } = useStore();

let dataQueryParams = {
  model: {
    name: "",
    parameterValues: [],
  },
  policy: {
    name: "",
    parameterValues: [],
  },
  options: [],
};

const gModels = {
  name: "Model",
  descBrief: "Environment from which actions are sampled",
  showSelection: true,
  items: models,
};
const gPolicies = {
  name: "Policy",
  descBrief: "Strategy used when choosing the next action to sample",
  showSelection: true,
  items: policies,
};
const gOptions = {
  name: "Options",
  descBrief: "Options regarding the data collection process",
  showSelection: false,
  items: options,
};

const chartOptions = {
  responsive: true,
};
</script>

<template>
  <DataQueryFormGroupList
    :models="gModels"
    :policies="gPolicies"
    :options="gOptions"
  ></DataQueryFormGroupList>

  <v-divider></v-divider>

  <Suspense>
    <BarChart
      :chartDataGetter="fetchMockData"
      :chartOptions="chartOptions"
    ></BarChart>

    <template #fallback> Loading... </template>
  </Suspense>
</template>
