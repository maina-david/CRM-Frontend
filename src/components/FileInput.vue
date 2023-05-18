<template>
  <div class="flex">
    <div class="w-80">
      <label
        for="formFileMultiple"
        class="form-label inline-block mb-2 text-xs text-gray-700"
        >Upload Files</label
      >
      <input
        class="form-control block w-full px-3 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        type="file"
        ref="file"
        v-on:change="handleFileUpload()"
        id="formFileMultiple"
        multiple
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "FileInput",

  setup() {
    const file = ref(null);

    const handleFileUpload = async () => {
      console.log("selected file", file.value.files);
    };

    return {
      handleFileUpload,
      file,
    };
  },
};
</script>

<style></style>
