<template>
  <div>
    <div class="p-2 border-b">
      <h2 class="text-sm font-normal">Service Level Today</h2>
    </div>
    <BarChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import BarChart from "@/components/Graphics/BarChart.vue";

export default {
  name: "ServiceLevelCard",
  props: {},
  data() {
    return {
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [
          "Queue 1",
          "Queue 2",
          "Queue 3",
          "Queue 4",
          "Queue 5",
          "Queue 6",
          "Queue 7",
        ],
        datasets: [
          {
            label: "Service Level:",
            backgroundColor: "#334155",
            data: [25, 45, 22, 12, 25, 45, 22],
          },
        ],
      },
    };
  },
  components: { BarChart },
};
</script>

<style></style>
