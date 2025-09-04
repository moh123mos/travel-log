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
  <div class="flex-1 flex h-screen">
    <app-side-bar />
    <div class="w-full p-8">
      <NuxtPage />
    </div>
  </div>
</template>
