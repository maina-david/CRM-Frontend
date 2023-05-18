<template>
  <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
    <div class="flex justify-between border-b p-2">
      <div class="p-2">
        <h2 class="text-md font-semibold">{{ nameOfIVR }}</h2>
      </div>
      <Dropdown select="Filter By" :options="options" />
    </div>
    <PieChart :chartData="chartData" :chartOptions="chartOptions" />
  </div>
</template>

<script>
import PieChart from "@/components/Graphics/PieChart.vue";
import Dropdown from "../Dropdown.vue";
export default {
  name: "IVRPieChart",
  props: {
    nameOfIVR: { type: String, required: true },
    myLabels: { type: Array, required: true },
    data: { type: Array, required: true },
  },
  data() {
    return {
      options: ["All queues", "Queue 1", "Queue 2", "Queue3"],
      chartOptions: {
        hoverBorderWidth: 20,
      },
      chartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: this.myLabels,
        datasets: [
          {
            label: "Total Calls",
            backgroundColor: this.getRandomColorEachSection(
              this.myLabels.length
            ),
            data: this.data,
          },
        ],
      },
    };
  },
  components: { PieChart, Dropdown },
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
