<script setup lang="ts">
import maplibre from "maplibre-gl";

import { CENTER_EG } from "~/lib/constants";

const mapStore = useMapStore();
const colorMode = useColorMode();
const style = computed(() => {
  return colorMode.value === "dark" ? "/styles/dark.json" : "/styles/light.json";
});
const zoom = 3;

onMounted(() => {
  maplibre.setRTLTextPlugin(
    "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
    true,
  );
  mapStore.init();
});
</script>

<template>
  <mgl-map
    :map-style="style"
    :center="CENTER_EG"
    :zoom="zoom"
  >
    <mgl-navigation-control />
    <mgl-marker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div class="tooltip tooltip-top" :data-tip="point.label">
          <Icon name="tabler:map-pin-filled" size="30" class="text-secondary" />
        </div>
      </template>
    </mgl-marker>
  </mgl-map>
</template>
