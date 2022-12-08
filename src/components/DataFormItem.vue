<script setup lang="ts">
import { withDefaults, ref, computed } from "vue";
import type { Model, Policy, ParameterArgs } from "@/data/types";
import InputParameter from "@/components/InputParameter.vue";

export interface Props {
  title: string;
  descBrief?: string;
  desc?: string;
  selectionItems: Model[] | Policy[] | Parameter[];
  showSelection?: bool;
}

const props = withDefaults(defineProps<Props>(), {
  showSelection: true,
});

function makeParameter(args: ParameterArgs) {
  return {
    modelValue: args.value,
    ...args,
  };
}

const selectedItem = ref(props.selectionItems[0]);
const selectedItemParameters = computed(() =>
  selectedItem.value.parameters.map((p) => makeParameter(p))
);
const selectionLabel = computed(() => {
  return `${props.title} Name`;
});
</script>

<template>
  <v-expansion-panel>
    <v-container>
      <v-expansion-panel-title v-slot="{ expanded }">
        <v-row no-gutters>
          <v-col cols="5" class="d-flex text-grey">
            <span class="text-overline">{{ title }}</span>
          </v-col>
          <v-col
            cols="auto"
            class="d-flex text-primary text-subtitle-2 align-center"
          >
            <v-fade-transition hide-on-leave>
              <span v-if="!expanded" key="0">
                {{ selectedItem.label }}
              </span>
              <span v-else key="1" class="text-secondary">
                {{ descBrief }}
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="py-6">
        <v-divider></v-divider>
        <v-row>
          <v-spacer></v-spacer>
          <v-col
            cols="10"
            class="d-flex justify-center justify-space-between py-6"
          >
            <v-select
              v-if="showSelection"
              v-model="selectedItem"
              :label="selectionLabel"
              :items="selectionItems"
              item-value="parameters"
              variant="outlined"
              return-object
            >
              <template v-slot:selection="{ item, index }">
                <span class="text-primary text-subtitle-1">{{
                  item.value.label
                }}</span>
              </template>
            </v-select>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-divider></v-divider>
          <v-col cols="6">
            <v-card flat v-for="param in selectedItemParameters">
              <v-card-text>
                <InputParameter v-bind="param"></InputParameter>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="d-flex justify-end align-center">
            <v-btn color="success" class="px-4 text-button">Save</v-btn>
          </v-col>
          <v-col cols="auto" class="d-flex align-center">
            <v-btn color="error" class="px-4 text-button">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-container>
  </v-expansion-panel>
</template>
