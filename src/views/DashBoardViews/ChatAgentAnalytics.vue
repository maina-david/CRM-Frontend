<template>
  <div class="flex border-b">
    <div>
      <h2 class="text-lg font-semibold py-2">Agent Chat Data Analytics</h2>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <div class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden" s>
      <div>
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">Total Number of Conversations</h2>
        </div>
        <PieChart
          :chartData="chatsPerAgentDailyTotalChartData"
          v-if="
            this.chatsPerAgentDailyTotalChartData.datasets[0].data?.length > 0
          "
        />
        <div v-else class="flex justify-center text-sm m-3">
          There is no data to display
        </div>
      </div>
    </div>
    <div class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div>
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">Total Closed Conversations</h2>
        </div>
        <PieChart
          :chartData="chatsPerAgentDailyClosedChartData"
          v-if="
            this.chatsPerAgentDailyClosedChartData.datasets[0].data?.length > 0
          "
        />
        <div v-else class="flex justify-center text-sm m-3">
          There is no data to display
        </div>
      </div>
    </div>
    <div class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div>
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">Total Open Conversations</h2>
        </div>
        <PieChart
          :chartData="chatsPerAgentDailyOpenChartData"
          v-if="
            this.chatsPerAgentDailyOpenChartData.datasets[0].data?.length > 0
          "
        />
        <div v-else class="flex justify-center text-sm m-3">
          There is no data to display
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Graphics/PieChart";
import { mapGetters } from "vuex";

export default {
  watch: {
    allAgent() {
      this.chatsPerAgentDailyTotalChartData.labels = this.allAgent;
      console.log("all Agent", this.chatsPerAgentDailyTotalChartData.labels);
    },
    allConversationsPerAgent() {
      this.chatsPerAgentDailyTotalChartData.datasets[0].backgroundColor =
        this.getRandomColorEachSection(this.allConversationsPerAgent.length);
      this.chatsPerAgentDailyTotalChartData.datasets[0].data =
        this.allConversationsPerAgent;
      console.log(
        "this is all the data",
        this.chatsPerAgentDailyTotalChartData.datasets[0].data
      );
      console.log(
        "this is all the background",
        this.chatsPerAgentDailyTotalChartData.datasets[0].backgroundColor
      );
    },
    allAgentOpen() {
      this.chatsPerAgentDailyOpenChartData.labels = this.allAgentOpen;
      console.log("all Queue", this.chatsPerAgentDailyOpenChartData.labels);
    },
    allConversationsPerAgentOpen() {
      this.chatsPerAgentDailyOpenChartData.datasets[0].backgroundColor =
        this.getRandomColorEachSection(this.allConversationsPerAgent.length);
      this.chatsPerAgentDailyOpenChartData.datasets[0].data =
        this.allConversationsPerAgentOpen;
      console.log(
        "this is all the data",
        this.chatsPerAgentDailyOpenChartData.datasets[0].data
      );
      console.log(
        "this is all the background",
        this.chatsPerAgentDailyOpenChartData.datasets[0].backgroundColor
      );
    },
    allAgentClosed() {
      this.chatsPerAgentDailyClosedChartData.labels = this.allAgentClosed;
      console.log(
        "all channels",
        this.chatsPerAgentDailyClosedChartData.labels
      );
    },
    allConversationsPerAgentClosed() {
      this.chatsPerAgentDailyClosedChartData.datasets[0].backgroundColor =
        this.getRandomColorEachSection(
          this.allConversationsPerAgentClosed.length
        );
      this.chatsPerAgentDailyClosedChartData.datasets[0].data =
        this.allConversationsPerAgentClosed;
      console.log(
        "this is all the data",
        this.chatsPerAgentDailyClosedChartData.datasets[0].data
      );
      console.log(
        "this is all the background",
        this.chatsPerAgentDailyClosedChartData.datasets[0].backgroundColor
      );
    },
  },
  data() {
    return {
      chatsPerAgentDailyTotalChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: "TOTAL CONVERSATIONS",
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chatsPerAgentDailyClosedChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: "ESCALATED TICKETS",
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chatsPerAgentDailyOpenChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: "RESOLVED TICKETS",
            backgroundColor: [],
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  components: {
    PieChart,
  },
  computed: {
    ...mapGetters([
      "allAgent",
      "allConversationsPerAgent",
      "allAgentOpen",
      "allConversationsPerAgentOpen",
      "allAgentClosed",
      "allConversationsPerAgentClosed",
    ]),
  },

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
