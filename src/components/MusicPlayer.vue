<template>
  <div class="flex space-x-3" :value="modelValue">
    <span
      class="text-lime-500 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-2 dark:bg-gray-700 dark:text-gray-300"
    >
      <span class="material-icons mr-3">play_circle</span>
      Play
    </span>
  </div>
</template>

<script>
export default {
  name: "MusicPlayer",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
