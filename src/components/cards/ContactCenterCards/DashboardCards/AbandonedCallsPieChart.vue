<template>
  <div>
    <div class="p-2 border-b">
      <h2 class="text-sm font-normal">Abandoned Calls</h2>
    </div>
    <PieChart :chartData="chartData" v-if="this.data.length > 0" />
    <div v-else class="flex justify-center text-sm m-3">
      There is no data to display
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Graphics/PieChart.vue";

export default {
  name: "AbandonedCallsPieChartCard",
  props: {
    myLabels: { type: Array, required: true },
    data: { type: Array, required: true },
  },

  data() {
    return {
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: this.myLabels,
        datasets: [
          {
            label: "Total Calls",
            data: this.data,
            backgroundColor: this.getRandomColorEachSection(this.data.length),
          },
        ],
      },
    };
  },

  components: { PieChart },
  methods: {
    getRandomColor() {
      var letters = "0123456789ABCDEF".split("");
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    getRandomColorEachSection(count) {
      var data = [];
      for (var i = 0; i < count; i++) {
        data.push(this.getRandomColor());
      }
      console.log(count);
      console.log(data);
      return data;
    },
  },
};
</script>

<style></style>
