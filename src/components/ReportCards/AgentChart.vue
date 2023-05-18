<template>
  <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
    <div class="p-2 border-b">
      <h2 class="text-md font-semibold">Total Agent Calls Analysis</h2>
    </div>
    <PieChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PieChart from "@/components/Graphics/PieChart.vue";
export default {
  name: "CallsPieChartCard",
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
            backgroundColor: ["#334155", "#cbd5e1"],
            data: [],
          },
        ],
      },
    };
  },
  components: { PieChart },
  created() {
    this.chartData.labels = this.agentCallcumulativeLabel;
    this.chartData.datasets[0].data = this.agentCallcumulativeData;
  },
  computed: {
    ...mapGetters(["agentCallcumulativeLabel", "agentCallcumulativeData"]),
  },
};
</script>

<style></style>
