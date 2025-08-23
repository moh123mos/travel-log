<script lang="ts" setup>
const error = useRoute().query.error as string || "Unexpected error occurred!";
</script>

<template>
  <div class="card bg-base-300 container mx-auto mt-4 min-h-72 flex justify-center items-center">
    <div
      role="alert"
      class="alert alert-error min-w-1/2 text-center"
    >
      <Icon name="tabler:alert-triangle" />
      <span>Oh no! {{ error }}</span>
    </div>
    <div class="text-center">
      <nuxt-link
        class="btn btn-primary mt-4 w-fit"
        to="/"
      >
        Home
        <Icon name="tabler:arrow-left" size="32" />
      </nuxt-link>
    </div>
  </div>
</template>
