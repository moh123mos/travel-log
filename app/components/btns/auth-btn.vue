<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const { loading, signIn } = useAuthStore();
</script>

<template>
  <button
    class="btn btn-accent"
    :disabled="loading"
    @click="signIn"
  >
    Sign In with github
    <span
      v-if="loading"
      class="loading loading-spinner loading-md"
    />
    <Icon
      v-else
      name="tabler:brand-github"
    />
  </button>
</template>
