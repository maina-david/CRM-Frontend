<template>
  <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
    <div class="p-2 border-b">
      <h2 class="text-sm font-normal">Resolution Rate Card</h2>
    </div>
    <LineChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import LineChart from "@/components/Graphics/LineChart.vue";

export default {
  name: "ResolutionRateCardAgent",
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
            label: "Total Tickets",
            backgroundColor: "#e2e8f0",
            data: [],
          },
        ],
      },
    };
  },
  components: { LineChart },
  created() {
    this.chartData.labels = [
      "Agent 1",
      "Agent 2",
      "Agent 3",
      "Agent 4",
      "Agent 5",
      "Agent 6",
      "Agent 7",
    ];
    this.chartData.datasets[0].data = [12, 23, 47, 89, 117, 34, 78];
  },
  updated() {
    this.chartData.labels = this.agentCallAbandonmentRateDailyLabel;
    this.chartData.datasets[0].data = this.agentCallAbandonmentRateDailyData;
  },
};
</script>

<style></style>
