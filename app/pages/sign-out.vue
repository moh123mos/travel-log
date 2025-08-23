<script lang="ts" setup>
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.signOut();
});
</script>

<template>
  <div class="card bg-base-300 container mx-auto mt-4 min-h-72 flex justify-center items-center">
    <span class="loading loading-dots loading-xl" />
  </div>
</template>
