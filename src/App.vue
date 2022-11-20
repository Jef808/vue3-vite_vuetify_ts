<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

async function genData() {
    /**
     * Asynchronusly loads up those three json files units of data.
     * -- **components**: ??,
     * -- **tags**: <Used for implementating auto-complete in Jetbrains IDEs,
     * -- **attributes**: ??
     */

    try {
        componentsLoading.value = true;
        const res = await axios.get("web-types.json");
        console.log(res.data);
        components.value = res.data;
    } catch (err) {
        console.error(err);
    } finally {
        componentsLoading.value = false;
    }

    try {
        tagsLoading.value = true;
        const res = await axios.get("tags.json");
        console.log(res.data);
        tags.value = res.data;
    } catch (err) {
        console.error(err);
    } finally {
        tagsLoading.value = false;
    }

    try {
        attributesLoading.value = true;
        const res = await axios.get("attributes.json");
        console.log(res.data);
        attributes.value = res.data;
    } catch (err) {
        console.error(err);
    } finally {
        attributesLoading.value = false;
    }
}

/**
 * Capture the status of the the above data fetch operation.
 */
const componentsLoading = ref(false);
const tagsLoading = ref(false);
const attributesLoading = ref(false);

const components = ref({});
const tags = ref({});
const attributes = ref({});

/**
 * The component which is eventually rendered on the main viewport.
 */
const tab = ref({});

onMounted(() => {
    genData();
});
</script>

<template>
    <v-tabs v-model="tab" background-color="red lignten-2" dark>
        <v-tab :value="components">
            <span>Components</span>
        </v-tab>
        <v-tab :value="tags">
            <span>Tags</span>
        </v-tab>
        <v-tab :value="attributes">
            <span>Attributes</span>
        </v-tab>
    </v-tabs>

    <pre v-if="componentsLoading || tagsLoading || attributesLoading">
Loading data...</pre>
    <pre v-else>{{ tab }}</pre>
</template>
