<template>
  <div class="flex">
    <div class="mt-1 xl:w-80">
      <label
        for="dropDown"
        class="form-label text-xs inline-block mb-2 text-gray-700"
        >{{ label }}</label
      >
      <select
        :value="modelValue"
        @input="handleInput"
        class="form-select block w-full px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option value="" disabled>{{ select }}</option>
        <option
          :disabled="disabled"
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "DropDown",
  props: {
    options: {
      type: Array,
      required: true,
    },
    select: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>

<style></style>
