<script setup lang="ts">
import { ref } from "vue";
import DataFormItem, {
  type Props as DataFormItemProps,
} from "@/components/DataFormItem.vue";

export interface Props {
  items: DataFormItemProps[];
}

const props = defineProps<Props>();
</script>

<template>
  <v-container>
    <v-expansion-panels variant="accordion">
      <DataFormItem v-for="item in items" v-bind="item"></DataFormItem>
    </v-expansion-panels>
  </v-container>
</template>
