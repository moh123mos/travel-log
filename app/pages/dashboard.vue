<script lang="ts" setup>
const route = useRoute();
const locationsStore = useLocationsStore();

onMounted(() => {
  if (route.path !== "/dashboard") {
    locationsStore.refresh();
  }
});
</script>

<template>
  <div class="flex-1 flex min-h-screen">
    <app-side-bar />
    <div class="overflow-auto w-full p-8 flex flex-col gap-4">
      <nuxt-page />
      <app-map />
    </div>
  </div>
</template>

<style scoped>
@import "tailwindcss";

:deep(.maplibregl-map) {
  @apply flex-1 min-h-96;
}
</style>
