<template>
  <div class="bg-white rounded-sm text-left overflow-hidden shadow-sm p-4">
    <div class="flex justify-between border-b p-2">
      <div class="p-2">
        <h2 class="text-md font-semibold">{{ header }}</h2>
      </div>
    </div>

    <BarChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BarChart from "@/components/Graphics/BarChart.vue";
export default {
  name: "QueueGraphs",
  props: {
    header: { type: String },
    chartData: { type: Object },
    chartOptions: { type: Object },
  },
  data() {
    return {};
  },
  components: { BarChart },
  computed: {
    ...mapGetters(["queueServiceCallLabel", "queueServiceCallData"]),
  },
};
</script>

<style></style>
