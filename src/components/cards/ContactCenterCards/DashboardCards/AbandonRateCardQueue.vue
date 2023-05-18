<template>
  <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
    <div class="p-2 border-b">
      <h2 class="text-sm font-normal">Abandon Rate Time</h2>
    </div>
    <LineChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import LineChart from "@/components/Graphics/LineChart.vue";

export default {
  watch: {
    callAbandonmentRateDailyData() {
      this.chartData.labels = this.callAbandonmentRateDailyLabel;
      this.chartData.datasets[0].data = this.callAbandonmentRateDailyData;
      console.log("i am watching here", this.callAbandonmentRateDailyData);
      console.log("i am watching here", this.callAbandonmentRateDailyData);
    },
  },
  name: "AbandonRateCardQueue",
  props: { cardName: { type: String, required: true } },
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: "Total Calls",
            backgroundColor: "#e2e8f0",
            data: [],
          },
        ],
      },
    };
  },
  components: { LineChart },
  created() {
    this.getCallAbandonmentRateDaily();
    this.chartData.labels = this.callAbandonmentRateDailyLabel;
    this.chartData.datasets[0].data = this.callAbandonmentRateDailyData;
  },
  updated() {
    this.getCallAbandonmentRateDaily();
    this.chartData.labels = this.callAbandonmentRateDailyLabel;
    this.chartData.datasets[0].data = this.callAbandonmentRateDailyData;
  },
  computed: {
    ...mapGetters([
      "callAbandonmentRateDailyLabel",
      "callAbandonmentRateDailyData",
    ]),
  },
  methods: {
    ...mapActions(["getCallAbandonmentRateDaily"]),
  },
};
</script>

<style></style>
