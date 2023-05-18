<template>
  <div>
    <div class="p-2 border-b">
      <h2 class="text-sm font-normal">First Call Resolution Rate Today</h2>
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
            label: "First Call Resolution:",
            backgroundColor: "#84cc16",
            data: [80, 45, 74, 24],
          },
        ],
      },
    };
  },
  components: { BarChart },
};
</script>

<style></style>
