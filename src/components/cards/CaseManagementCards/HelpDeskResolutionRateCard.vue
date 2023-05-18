<template>
  <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
    <div class="p-2 border-b">
      <h2 class="text-sm font-semibold">Help Desk Resolution Rate Card</h2>
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
      "Help Desk 1",
      "Help Desk 2",
      "Help Desk 3",
      "Help Desk 4",
      "Help Desk 5",
      "Help Desk 6",
      "Help Desk 7",
    ];
    this.chartData.datasets[0].data = [122, 231, 47, 189, 117, 34, 78];
  },
};
</script>

<style></style>
