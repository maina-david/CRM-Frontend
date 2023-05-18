<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="flex justify-between border-b p-2">
      <div class="p-2">
        <h2 class="text-md font-semibold">First Call Resolution</h2>
      </div>
    </div>
    <BarChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BarChart from "@/components/Graphics/BarChart.vue";
export default {
  name: "FCR",
  props: {},
  data() {
    return {
      options: ["All queues", "Queue 1", "Queue 2", "Queue3"],

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
            label: "Queue 1 Service Level:",
            backgroundColor: "#334155",
            data: [25, 45, 22, 12, 25, 45, 22],
          },
          {
            label: "Queue 2 Service Level:",
            backgroundColor: "#6b7280",
            data: [12, 25, 45, 22, 25, 45, 22],
          },
          {
            label: "Queue 3 Service Level:",
            backgroundColor: "#164e63",
            data: [22, 12, 25, 45, 22, 25, 45],
          },
          {
            label: "Queue 4 Service Level:",
            backgroundColor: "#0c4a6e",
            data: [45, 22, 12, 25, 45, 22, 25],
          },
          {
            label: "Queue 5 Service Level:",
            backgroundColor: "#fda4af",
            data: [75, 32, 52, 65, 45, 2, 25],
          },
          {
            label: "Queue 6 Service Level:",
            backgroundColor: "#134e4a",
            data: [45, 22, 12, 25, 45, 22, 15],
          },
        ],
      },
    };
  },
  components: { BarChart },
  computed: {
    ...mapGetters([
      "queueFirstCallResolutionLabel",
      "queueFirstCallResolutionData",
    ]),
  },
  created() {
    this.chartData.labels = this.queueFirstCallResolutionLabel;
    this.chartData.datasets[0].data = this.queueFirstCallResolutionData;
  },
};
</script>

<style></style>
