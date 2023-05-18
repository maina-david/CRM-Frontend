<template>
  <div class="flex justify-between border-b mt-10 m-5">
    <div class="m-3 flex">
      <DateRangePicker v-model="date" class="mt-7" />
      <Dropdown
        v-if="date.start"
        class="ml-4 w-6/12"
        select="Select IVR Background"
        placeholder="Select IVR Background"
        :options="selectIvrBackground"
        v-model="option"
      />
    </div>
    <div class="m-4">
      <ActionButton text="Export"></ActionButton>
    </div>
  </div>
  <div class="m-5 grid grid-cols-3 gap-6">
    <div class="col-span-1" v-for="ivr in ivrs" :key="ivr.nameOfIVR">
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="flex justify-between border-b p-2"></div>
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
          s
        >
          <div>
            <div class="p-2 border-b">
              <h2 class="text-sm font-normal">IVR Report</h2>
            </div>
            <PieChart
              :chartData="ivrHitChartData"
              v-if="this.ivrHitChartData.datasets[0].data?.length > 0"
            />
            <div v-else class="flex justify-center text-sm m-3">
              There is no data to display
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import PieChart from "@/components/Graphics/PieChart";
import ActionButton from "@/components/ActionButton.vue";
import DateRangePicker from "@/components/DateRangePicker.vue";
import Dropdown from "@/components/Dropdown.vue";

export default {
  data() {
    return {
      start: "",
      end: "",
      date: "",
      option: "",
      ivrHitChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: "TOTAL CALLS",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      ivrs: [
        {
          nameOfIVR: "First IVR",
          data: [60, 25, 15],
          labels: ["English", "Kiswahili", "French"],
        },
      ],
    };
  },
  created() {
    this.start = moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format(
      "yyyy-MM-DD"
    );
    this.end = moment(new Date().getTime()).format("yyyy-MM-DD");
    this.date = {
      start: this.start,
      end: this.end,
    };
    this.getIvrBackground();
  },
  watch: {
    option: function (val) {
      console.log("changed option", val);
      if (!val) {
        console.log("No Option");
      } else {
        this.getIvrHitReport({
          start: this.date.start,
          end: this.date.end,
          option: val,
        });
      }
    },
    ivrHitLabel: function (val) {
      console.log("changed date", val);
      this.ivrHitChartData.labels = this.ivrHitLabel;
      this.ivrHitChartData.datasets[0].data = this.ivrHitData;
      this.ivrHitChartData.datasets[0].label = "IVR HITS";
    },
    ivrHitData: function (val) {
      console.log("changed date", val);
      this.ivrHitChartData.labels = this.ivrHitLabel;
      this.ivrHitChartData.datasets[0].data = this.ivrHitData;
      this.ivrHitChartData.datasets[0].label = "IVR HITS";
    },
  },
  components: {
    PieChart,
    ActionButton,
    DateRangePicker,
    Dropdown,
  },
  methods: {
    ...mapActions(["getIvrHitReport", "getIvrBackground"]),
    getRandomColor() {
      var letters = "0123456789ABCDEF".split("");
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getRandomColorEachSection(count) {
      var data = [];
      for (var i = 0; i < count; i++) {
        data.push(this.getRandomColor());
      }
      console.log(count);
      console.log(data);
      return data;
    },
  },
  computed: {
    ...mapGetters(["ivrHitLabel", "ivrHitData", "selectIvrBackground"]),
  },
};
</script>

<style></style>
