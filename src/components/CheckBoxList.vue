<template>
  <div
    class="flex flex-col items-start justify-center border-2 my-3 border-gray-100 p-8 rounded-lg bg-gray-50"
  >
    <label
      for="dropDown"
      class="form-label text-md inline-block mb-2 text-gray-700"
      >{{ label }}</label
    >
    <CheckBox
      v-for="option in options"
      :disabled="disabled"
      :checked="value.includes(option.value)"
      @update:checked="check(option.value, $event)"
      :fieldId="option.label"
      :label="option.label"
      :key="option"
    />
  </div>
</template>

<script>
import Checkbox from "./CheckBox.vue";

export default {
  emits: ["update:value"],
  props: {
    value: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
      validator: (value) => {
        const hasNameKey = value.every((option) =>
          Object.keys(option).includes("label")
        );
        const hasIdKey = value.every((option) =>
          Object.keys(option).includes("value")
        );
        return hasNameKey && hasIdKey;
      },
    },
  },
  setup(props, context) {
    const check = (optionId, checked) => {
      let updatedValue = [...props.value];
      if (checked) {
        updatedValue.push(optionId);
      } else {
        updatedValue.splice(updatedValue.indexOf(optionId), 1);
      }
      context.emit("update:value", updatedValue);
    };

    return {
      check,
    };
  },
  components: {
    CheckBox: Checkbox,
  },
};
</script>
