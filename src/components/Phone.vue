<template>
  <div>
    <label
      for="number"
      class="form-label text-xs inline-block mb-0 text-gray-700"
      >{{ label }}</label
    >
    <div class="flex flex-row mt-4 mr-5">
      <select
        class="form-select block w-24 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        <option selected>{{ select }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <input
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        class="form-control block w-56 px-5 py-1.5 text-xs font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script>
import "vue3-tel-input/dist/vue3-tel-input.css";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Phone",
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    options: {
      type: Array,
      required: true,
    },
    select: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "phone",
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      phone: "",
    };
  },
  created() {
    console.log("Phone input data", this.phone);
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput($event) {
      this.$emit("update:modelValue", $event.target.value);
    },
  },
  setup() {
    return {};
  },
};
</script>

<style></style>
