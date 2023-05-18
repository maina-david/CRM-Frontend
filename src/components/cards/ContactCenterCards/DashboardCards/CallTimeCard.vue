<template>
  <div
    class="relative bg-white rounded-sm text-left overflow-hidden shadow-sm p-3"
  >
    <div class="p-2 border-b">
      <h2 class="text-sm font-normal">Call Time</h2>
    </div>
    <BarChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import BarChart from "@/components/Graphics/BarChart.vue";

export default {
  name: "BarChartCard",
  props: {},
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "Call Time:",
            backgroundColor: "#f87979",
            data: [25, 45, 22, 12],
          },
        ],
      },
    };
  },
  components: { BarChart },
};
</script>

<style></style>
