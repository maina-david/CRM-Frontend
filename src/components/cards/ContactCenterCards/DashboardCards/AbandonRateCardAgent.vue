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
  name: "AbandonRateCardAgent",
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
    this.getAgentCallAbandonmentRateDaily();
    this.chartData.labels = this.agentCallAbandonmentRateDailyLabel;
    this.chartData.datasets[0].data = this.agentCallAbandonmentRateDailyData;
  },
  updated() {
    this.chartData.labels = this.agentCallAbandonmentRateDailyLabel;
    this.chartData.datasets[0].data = this.agentCallAbandonmentRateDailyData;
  },
  computed: {
    ...mapGetters([
      "agentCallAbandonmentRateDailyLabel",
      "agentCallAbandonmentRateDailyData",
    ]),
  },
  methods: {
    ...mapActions(["getAgentCallAbandonmentRateDaily"]),
  },
};
</script>

<style></style>
