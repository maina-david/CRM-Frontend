<template>
  <div class="flex justify-between mb-1">
    <span class="text-sm font-medium text-gray-700 dark:text-white">{{
      label
    }}</span>
    <span class="text-xs font-medium text-gray-700 dark:text-white">{{
      percentage_progress
    }}</span>
  </div>
  <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
    <div class="bg-lime-500 h-1.5 rounded-full" :style="style"></div>
  </div>
</template>

<script>
export default {
  props: {
    percentage_progress: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    style() {
      return "width: " + this.percentage_progress;
    },
  },
};
</script>

<style></style>
