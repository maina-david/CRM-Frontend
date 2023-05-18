<template>
  <div>
    <a
      href="#"
      class="p-2 flex justify-between text-center bg-white border rounded-sm border-gray-200 shadow-xs hover:bg-slate-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5
        class="text-md font-medium tracking-tight text-gray-900 dark:text-white"
      >
        {{ text }}
      </h5>
      <div class="bg-lime-500 rounded-full px-1 text-white">
        <span class="material-icons text-sm">add</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ["text"],
};
</script>

<style></style>
