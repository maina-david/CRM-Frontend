<template>
  <div>
    <label
      class="block my-3 text-xs font-medium text-gray-900 dark:text-gray-400"
      >{{ label }}</label
    >
    <Vue3TagsInput :tags="tags" :placeholder="placeholder" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Vue3TagsInput from "vue3-tags-input";

export default defineComponent({
  components: {
    Vue3TagsInput,
  },
  props: {
    tags: { type: Array },
    placeholder: { type: String },
    label: { type: String },
  },
  data() {
    return {};
  },
});
</script>

<style></style>
