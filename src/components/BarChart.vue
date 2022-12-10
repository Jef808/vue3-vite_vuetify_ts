<script setup lang="ts">
import { type Ref, ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import type { ChartData } from "@/data/types";

export interface Props {
  chartDataGetter: () => Promise<ChartData>;
  chartOptions?: {
    responsive?: boolean;
  };
}

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = withDefaults(defineProps<Props>(), {
  chartOptions: () => ({} as { responsive?: boolean | undefined }),
});

const _chartData = await props.chartDataGetter();
const chartData = ref(_chartData);
</script>

<template>
  <div class="container">
    <Bar :options="chartOptions" :data="chartData"> </Bar>
  </div>
</template>
