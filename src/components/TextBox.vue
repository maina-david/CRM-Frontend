<template>
  <div class="flex mb-3 mr-5">
    <div class="w-full">
      <label
        for="textBox"
        class="form-label text-xs inline-block my-2 text-gray-700"
        >{{ label }}</label
      >
      <input
        :disabled="disabled"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        class="form-control block w-80 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-sm transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TextBox",
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: true,
      default: "text",
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
  emits: ["update:modelValue"],
  methods: {
    handleInput($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>

<style></style>
