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
    :class="{ 'justify-center': !props.showLabel, 'justify-start': props.showLabel }"
  >
    <Icon
      size="24"
      :name="props.icon"
    />
    {{ props.showLabel ? props.label : '' }}
  </NuxtLink>
</template>
