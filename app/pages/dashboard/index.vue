<script lang="ts" setup>
const isOpenSidebar = ref(false);

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
  <div class="flex h-screen">
    <div
      class="flex relative h-screen duration-300 transition-all"
      :class="{ 'w-64': isOpenSidebar, 'w-16': !isOpenSidebar }"
    >
      <Icon
        class="absolute top-4 right-4 cursor-pointer"
        size="28"
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
        <hr class="my-2 border-none h-1 bg-gray-100 dark:bg-gray-700 opacity-50 rounded">
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
    <div class="w-full p-4">
      <h2 class="text-lg font-semibold">
        Main Content
      </h2>
      <p>Welcome to your dashboard!</p>
    </div>
  </div>
</template>
