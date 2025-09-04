<!-- eslint-disable no-alert -->
<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

import { insertLocation } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();
const router = useRouter();
const submittedError = ref("");
const submitted = ref(false);
const loading = ref(false);
const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(insertLocation),
});

const onSumit = handleSubmit(async (values) => {
  try {
    submittedError.value = "";
    loading.value = true;
    await $csrfFetch("/api/locations/location", {
      method: "post",
      body: values,
    });
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data.data) {
      setErrors(error.data?.data);
    }
    submittedError.value = error.statusMessage || "An unknown Error occured!";
  }
  finally {
    submitted.value = true;
    loading.value = false;
  }
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    return window.confirm("You have unsaved changes. Are you sure you want to leave?");
  }
});
</script>

<template>
  <div class="container mx-auto max-w-md flex flex-col gap-3">
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-3">
          Add Location
        </h2>
        <p class="text-base-content/70 leading-relaxed">
          A location is a place you have traveled or will
          travel to. It can be a city, country, state or point
          of interest. You can add specific times you
          visited this location after adding it.
        </p>
      </div>
    </div>
    <div
      v-if="!!submittedError"
      role="alert"
      class="alert alert-error"
    >
      <Icon
        name="tabler:circle-x"
        size="28"
      />
      <span>{{ submittedError }}</span>
    </div>
    <form @submit.prevent="onSumit">
      <app-input-field
        label="Name"
        name="name"
        :error="errors.name"
        :disabled="loading"
      />
      <app-input-field
        label="Description"
        name="description"
        type="textarea"
        :error="errors.description"
        :disabled="loading"
      />
      <app-input-field
        label="Latitude"
        name="lat"
        type="number"
        :error="errors.lat"
        :disabled="loading"
      />
      <app-input-field
        label="Longitude"
        name="long"
        type="number"
        :error="errors.long"
        :disabled="loading"
      />
      <div class="w-full flex justify-end gap-2 mt-5">
        <button
          type="button"
          class="btn btn-outline"
          :disabled="loading"
          @click="router.back()"
        >
          <Icon
            name="tabler:arrow-left"
            size="24"
          />
          cancel
        </button>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
        >
          add location
          <span
            v-if="loading"
            class="loading loading-spinner loading-md"
          />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
        </button>
      </div>
    </form>
  </div>
</template>
