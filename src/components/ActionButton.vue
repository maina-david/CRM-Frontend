<template>
  <button
    type="submit"
    class="w-full bg-lime-500 rounded-sm cursor-pointer hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  >
    <span
      class="inline-flex py-2 px-4 text-xs font-medium text-center text-white"
      >{{ text }}</span
    >
  </button>
</template>

<script>
export default {
  name: "ActionButton",
  props: ["text", "isPrimary"],
  data() {
    return {
      primary: this.isPrimary,
    };
  },
};
</script>
