<template>
  <div
    class="max-w-xs pt-10 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <label class="inline-block p-3 font-bold text-blue-700">{{ head }}</label>
    <div class="flex flex-col p-5">
      <label
        for="formFileMultiple"
        class="form-label inline-block text-blue-700"
        >{{ label }}</label
      >
      <TextBox />
    </div>
    <div class="flex flex-col p-5">
      <label
        for="formFileMultiple"
        class="form-label inline-block text-blue-700"
        >{{ label }}</label
      >
      <Dropdown />
    </div>
  </div>
</template>

<script>
import TextBox from "./TextBox.vue";
import Dropdown from "./Dropdown.vue";

export default {
  name: "ManagementCard",
  props: ["label", "head"],
  components: {
    TextBox,
    Dropdown,
  },
  data() {
    return {};
  },
};
</script>

<style></style>
