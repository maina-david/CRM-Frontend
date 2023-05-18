<template>
  <div
    class="px-5 py-5 w-full max-w-sm bg-white hover:bg-slate-300 rounded-sm flex justify-center text-wrap shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
  >
    <p class="font-semibold w-48 h-24 align-middle">{{ module }}</p>
  </div>
</template>

<script>
export default {
  props: { module: { type: String, required: "true" } },
};
</script>

<style></style>
