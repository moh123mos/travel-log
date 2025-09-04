type SidebarItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

export const useSidebarStore = defineStore("sidebarStore", () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const loading = ref(false);

  return {
    sidebarItems,
    loading,
  };
});
