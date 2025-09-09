<script lang="ts" setup>
const isOpenSidebar = ref(true);
const sidebarStore = useSidebarStore();

function saveInLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

function toggleSidebar() {
  isOpenSidebar.value = !isOpenSidebar.value;
  saveInLocalStorage("isOpenSidebar", isOpenSidebar.value);
}

onMounted(() => {
  isOpenSidebar.value = getFromLocalStorage("isOpenSidebar");
});
</script>

<template>
  <div
    class="flex relative min-h-screen duration-300 transition-all"
    :class="{ 'w-64': isOpenSidebar, 'w-16': !isOpenSidebar }"
  >
    <Icon
      class="absolute top-4 right-4 cursor-pointer"
      size="32"
      :name="isOpenSidebar ? 'tabler:chevron-left' : 'tabler:chevron-right'"
      @click="toggleSidebar"
    />
    <ul class="menu bg-base-200 pt-15 flex-1 flex flex-col gap-2">
      <li>
        <BtnsSidebarBtn
          href="/dashboard"
          label="Locations"
          icon="tabler:map"
          :show-label="isOpenSidebar"
        />
      </li>
      <li>
        <BtnsSidebarBtn
          href="/dashboard/add"
          label="Add Location"
          icon="tabler:circle-plus-filled"
          :show-label="isOpenSidebar"
        />
      </li>
      <div
        v-if="sidebarStore.loading || sidebarStore.sidebarItems.length"
        class="divider my-2"
      />
      <div v-if="sidebarStore.loading">
        <div class="skeleton h-6 w-full" />
      </div>
      <div
        v-else
        class="flex flex-col"
      >
        <li
          v-for="loc in sidebarStore.sidebarItems"
          :key="loc.id"
        >
          <BtnsSidebarBtn
            :href="loc.href"
            :label="loc.label"
            :icon="loc.icon"
            :show-label="isOpenSidebar"
          />
        </li>
      </div>
      <div class="divider my-2" />
      <li>
        <BtnsSidebarBtn
          href="/sign-out"
          label="Sign Out"
          icon="tabler:logout-2"
          :show-label="isOpenSidebar"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Custom scrollbar styles using Tailwind and daisyUI with @apply */
.overflow-y-auto {
  /* Custom scrollbar styles using plain CSS */
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary) var(--color-background);
}

.overflow-y-auto::-webkit-scrollbar {
  width: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #3b82f6;
  /* blue-500 */
  border-radius: 9999px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background-color: #e5e7eb;
  /* gray-200 */
}
</style>
