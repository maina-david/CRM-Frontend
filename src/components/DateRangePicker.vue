<template>
  <div class="flex w-full">
    <litepie-datepicker
      placeholder="Select Filter Dates"
      class="text-xs"
      separator=" to "
      :formatter="formatter"
      v-model="dateValue"
    ></litepie-datepicker>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "DateRangePicker",
  setup(props, { emit }) {
    const dateValue = ref({ start: "", end: "" });
    const formatter = ref({
      date: "YYYY-MM-DD",
    });
    emit("update:modelValue", dateValue);
    return {
      dateValue,
      formatter,
    };
  },
};
</script>
