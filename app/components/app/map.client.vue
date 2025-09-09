<script setup lang="ts">
import maplibre from "maplibre-gl";

import { CENTER_EG } from "~/lib/constants";

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
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="CENTER_EG"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
