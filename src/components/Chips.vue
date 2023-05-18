<template>
  <div class="flex flex-wrap justify-center space-x-2">
    <span
      class="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
    >
      {{ chipText }}
      <span class="material-icons">close</span>
    </span>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Chips",
  props: {
    chipsText: {
      type: String,
    },
    onCLose: {
      type: Function,
    },
  },
};
</script>
