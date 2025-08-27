<script lang="ts" setup>
type Props = {
  label: string;
  name: string;
  type?: "text" | "textarea" | "number";
  error?: string;
  placeholder?: string;
  disabled?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  placeholder: "Type here",
});

const inputElement = computed(() => props.type === "textarea" ? "textarea" : "input");

const inputClasses = computed(() => [
  "w-full",
  {
    "textarea": props.type === "textarea",
    "input": props.type !== "textarea",
    "input-error": props.error,
  },
]);
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ label }}
    </legend>
    <Field
      :name="name"
      :type="type"
      :as="inputElement"
      :class="inputClasses"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <p
      v-if="error"
      class="text-error fieldset-label"
    >
      {{ error }}
    </p>
  </fieldset>
</template>
