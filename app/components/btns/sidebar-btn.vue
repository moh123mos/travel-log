<script lang="ts" setup>
const props = defineProps<{
  href: string;
  label: string;
  icon: string;
  showLabel: boolean;
}>();
</script>

<template>
  <NuxtLink
    :to="props.href"
    class="flex items-center gap-2 text-nowrap"
  >
    <Icon
      size="28"
      :name="props.icon"
    />
    {{ props.showLabel ? props.label : '' }}
  </NuxtLink>
</template>
