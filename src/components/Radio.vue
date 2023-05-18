<template>
  <div class="flex">
    <div>
      <label
        for="dropDown"
        class="form-label text-sm font-semibold inline-block mt-4 mb-4 text-gray-700"
        >{{ label }}</label
      >
      <div v-for="option in options" :key="option.value">
        <div class="form-check">
          <input
            :disabled="disabled"
            class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            @input="handleInput"
            :value="option.value"
          />
          <label
            class="form-check-label inline-block text-gray-700 text-xs"
            for="flexRadioDefault1"
          >
            {{ option.label }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioBox",
  props: {
    options: {
      type: Array,
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
  data() {},
  emits: ["update:modelValue"],
  methods: {
    handleInput($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
  },
};
</script>

<style></style>
