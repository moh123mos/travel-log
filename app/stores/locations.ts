export const useLocationsStore = defineStore("location-store", () => {
  const { data: locations, status, refresh } = useFetch("/api/locations/location", {
    lazy: true,
  });

  const sidebarStore = useSidebarStore();

  watchEffect(() => {
    if (locations.value) {
      sidebarStore.sidebarItems = locations.value?.map(loc => ({
        id: `location-${loc.id}`,
        label: loc.name,
        href: "#",
        icon: "tabler:map-pin-filled",
      }));
    }
    sidebarStore.loading = status.value === "pending";
  });

  return {
    locations,
    status,
    refresh,
  };
});
