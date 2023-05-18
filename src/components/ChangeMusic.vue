<template>
  <div class="flex">
    <div class="">
      <select
        class="form-select block w-full px-2 py-1.5 text-xs text-white bg-blue-600 bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option selected>Change</option>
        <option v-for="option in options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangeMusic",
  data() {
    return {
      options: ["Option 1", "Option 2"],
    };
  },
};
</script>

<style></style>
