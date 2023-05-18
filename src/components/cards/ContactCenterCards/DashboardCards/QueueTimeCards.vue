<template>
  <div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3"
  >
    <div class="p-2 border-b">
      <h2 class="text-sm font-normal">Answered Calls</h2>
    </div>
    <LineChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import LineChart from "@/components/Graphics/LineChart.vue";

export default {
  name: "AnsweredPieChartCard",
  props: { cardName: { type: String, required: true } },
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Queue 1", "Queue 2", "Queue 3", "Queue 4", "Queue 5"],
        datasets: [],
      },
    };
  },
  components: { LineChart },
};
</script>

<style></style>
