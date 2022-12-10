<script setup lang="ts">
import { reactive, toRefs, ref, computed } from "vue";
import type { Model, Policy, Options } from "@/data/types";
import InputParameter from "@/components/InputParameter.vue";

export interface Props {
  name: string;
  descBrief: string;
  showSelection: boolean;
  items: Model[] | Policy[] | Options[];
}
interface Emits {
  (
    e: "update",
    itemName: string,
    parameters: { name: string; value: number }[]
  ): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Reactive ref to the currently selected item
const selectedItem = ref(props.items[0]);

// A reactive local copy of the parameters which will be used
// when submitting the form
const selectedItemParameters = reactive(
  selectedItem.value.parameters.map((param) => {
    return { name: param.name, value: ref(param.value) };
  })
);

// The label we insert in the select component
const selectionLabel = computed(() => {
  return `${props.name} Name`;
});

// We make a non-reactive copy of the reactive selectedItemParameters and return it,
// along with the name of the selected item.
function onSubmit() {
  const itemName = selectedItem.value.name;

  const selectedParameters = selectedItemParameters.map((param) => {
    return { name: param.name, value: param.value.value };
  });

  emit("update", itemName, selectedItemParameters); //selectedParameters);
}

function onCancel() {
  selectedItemParameters.forEach((p, idx) => {
    p.value = selectedItem.value.parameters[idx].value;
  });
}
</script>

<template>
  <v-expansion-panel>
    <v-container>
      <v-expansion-panel-title v-slot="{ expanded }">
        <v-row no-gutters>
          <v-col cols="4" class="d-flex justify-start text-grey">
            <span class="text-overline">{{ name }}</span>
          </v-col>
          <v-col cols="auto" class="d-flex align-center text-subtitle-2">
            <v-fade-transition leave-absolute
              ><!-- hide-on-leave> -->
              <span v-if="expanded" key="0" class="text-secondary">
                {{ descBrief }}
              </span>
              <span v-else key="1" class="text-primary">
                {{ selectedItem.label }}
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="py-6">
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
              :items="items"
              variant="outlined"
              item-value="parameters"
              item-title="label"
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
            <v-card
              flat
              v-for="(param, idx) in selectedItem.parameters"
              :key="param.name"
            >
              <v-card-text>
                <InputParameter
                  :name="param.name"
                  :label="param.label"
                  :min="param.min"
                  :max="param.max"
                  :step="param.step"
                  v-model="selectedItemParameters[idx].value"
                ></InputParameter>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="auto" class="d-flex justify-end align-center">
            <v-btn color="success" class="px-4 text-button" @click="onSubmit"
              >Save</v-btn
            >
          </v-col>
          <v-col cols="auto" class="d-flex align-center">
            <v-btn color="error" class="px-4 text-button" @click="onCancel"
              >Cancel</v-btn
            >
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-container>
  </v-expansion-panel>
</template>
