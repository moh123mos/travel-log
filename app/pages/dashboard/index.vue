<script lang="ts" setup>
const locationsStore = useLocationsStore();
const { locations, status } = storeToRefs(locationsStore);

onMounted(() => {
  locationsStore.refresh();
});
</script>

<template>
  <div class="">
    <h2 class="text-xl font-bold mb-4">
      Locations
    </h2>
    <span
      v-if="status === 'pending'"
      class="loading loading-spinner loading-xl"
    />
    <div v-else-if="locations && locations.length > 0">
      <transition-group
        name="list"
        tag="div"
        class="flex justify-center flex-wrap gap-4"
      >
        <div
          v-for="loc in locations"
          :key="loc.id"
          class="card bg-base-300 h-40 w-72 shadow-md"
        >
          <div class="card-body">
            <h2 class="card-title">
              {{ loc.name }}
            </h2>
            <p>
              {{ loc.description }}
            </p>
          </div>
        </div>
      </transition-group>
    </div>
    <div
      v-else
      class="flex flex-col gap-2 mt-4"
    >
      <p>Add a location to get started</p>
      <nuxt-link
        to="/dashboard/add"
        class="btn btn-primary max-w-40"
      >
        add location
        <Icon
          name="tabler:circle-plus-filled"
          size="24"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<style>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.list-leave-active {
  position: absolute;
}
</style>
