export const useLocationsStore = defineStore("location-store", () => {
  const { data: locations, status, refresh } = useFetch("/api/locations/location", {
    lazy: true,
  });

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  effect(() => {
    if (locations.value) {
      sidebarStore.sidebarItems = locations.value?.map(loc => ({
        id: `location-${loc.id}`,
        label: loc.name,
        href: "#",
        icon: "tabler:map-pin-filled",
      }));

      mapStore.mapPoints = locations.value?.map(loc => ({
        id: `mark-${loc.id}`,
        label: loc.name,
        lat: loc.lat,
        long: loc.long,
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
