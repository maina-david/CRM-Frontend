<template>
  <div class="flex w-full">
    <date-picker
      v-if="format == 'day'"
      placeholder="Select Day"
      @change="changeDay"
      v-model:value="day"
    ></date-picker>
    <date-picker
      v-if="format == 'week'"
      placeholder="Select Week"
      @change="changeWeek"
      v-model:value="week"
      type="week"
    ></date-picker>
    <date-picker
      v-if="format == 'month'"
      placeholder="Select Month"
      @change="changeMonth"
      v-model:value="month"
      type="month"
    ></date-picker>
    <date-picker
      v-if="format == 'year'"
      placeholder="Select Year"
      @change="changeYear"
      v-model:value="year"
      type="year"
    ></date-picker>
  </div>
</template>

<script>
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import moment from "moment";

export default {
  name: "DatePick",
  props: {
    format: {
      type: String,
      required: false,
      default: "day",
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      day: "",
      week: "",
      month: "",
      year: "",
    };
  },
  components: {
    DatePicker,
  },
  methods: {
    changeDay() {
      this.day = moment(this.day).format("YYYY-MM-DD");
      if (this.format == "day") {
        this.$emit("update:modelValue", this.day);
      }
    },
    changeWeek() {
      this.week = moment(this.week).format("YYYY") + moment(this.week).week();
      if (this.format == "week") {
        this.$emit("update:modelValue", this.week);
      }
    },
    changeMonth() {
      this.month = moment(this.month).format("YYYY-MM");
      if (this.format == "month") {
        this.$emit("update:modelValue", this.month);
      }
    },
    changeYear() {
      this.year = moment(this.year).format("YYYY");
      if (this.format == "year") {
        this.$emit("update:modelValue", this.year);
      }
    },
  },
};
</script>
