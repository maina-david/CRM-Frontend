<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="flex justify-between border-b p-2">
      <div class="p-2">
        <h2 class="text-md font-semibold">Service Level</h2>
      </div>
    </div>

    <BarChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BarChart from "@/components/Graphics/BarChart.vue";

export default {
  name: "ServiceLevelCard",
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
        labels: [],
        datasets: [
          {
            label: "Queue 1 Service Level:",
            backgroundColor: "#334155",
            data: [],
          },
        ],
      },
    };
  },
  components: { BarChart },
  computed: {
    ...mapGetters(["queueServiceCallLabel", "queueServiceCallData"]),
  },
  created() {
    this.chartData.labels = this.queueServiceCallLabel;
    this.chartData.datasets[0].data = this.queueServiceCallData;
  },
};
</script>

<style></style>
