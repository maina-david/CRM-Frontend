<template>
  <div class="flex border-b">
    <div>
      <h2 class="text-lg font-semibold py-2">Queue Chat Data Analytics</h2>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <div class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden" s>
      <div>
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">Total Number of Conversations</h2>
        </div>
        <PieChart
          :chartData="chatsPerQueueDailyTotalChartData"
          v-if="
            this.chatsPerQueueDailyTotalChartData.datasets[0].data?.length > 0
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
          :chartData="chatsPerQueueDailyClosedChartData"
          v-if="
            this.chatsPerQueueDailyClosedChartData.datasets[0].data?.length > 0
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
          :chartData="chatsPerQueueDailyOpenChartData"
          v-if="
            this.chatsPerQueueDailyOpenChartData.datasets[0].data?.length > 0
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
  created() {
    this.chatsPerQueueDailyTotalChartData.labels = this.allQueues;
    console.log("all Queues", this.chatsPerQueueDailyTotalChartData.labels);
    this.chatsPerQueueDailyTotalChartData.datasets[0].backgroundColor =
      this.getRandomColorEachSection(this.allConversationsPerQueue.length);
    this.chatsPerQueueDailyTotalChartData.datasets[0].data =
      this.allConversationsPerQueue;
    console.log(
      "this is all the data",
      this.chatsPerQueueDailyTotalChartData.datasets[0].data
    );
    console.log(
      "this is all the background",
      this.chatsPerQueueDailyTotalChartData.datasets[0].backgroundColor
    );
  },
  watch: {
    allQueues() {
      this.chatsPerQueueDailyTotalChartData.labels = this.allQueues;
      console.log("all Queues", this.chatsPerQueueDailyTotalChartData.labels);
    },
    allConversationsPerQueue() {
      this.chatsPerQueueDailyTotalChartData.datasets[0].backgroundColor =
        this.getRandomColorEachSection(this.allConversationsPerQueue.length);
      this.chatsPerQueueDailyTotalChartData.datasets[0].data =
        this.allConversationsPerQueue;
      console.log(
        "this is all the data",
        this.chatsPerQueueDailyTotalChartData.datasets[0].data
      );
      console.log(
        "this is all the background",
        this.chatsPerQueueDailyTotalChartData.datasets[0].backgroundColor
      );
    },
    allQueuesOpen() {
      this.chatsPerQueueDailyOpenChartData.labels = this.allQueuesOpen;
      console.log("all Queue", this.chatsPerQueueDailyOpenChartData.labels);
    },
    allConversationsPerQueueOpen() {
      this.chatsPerQueueDailyOpenChartData.datasets[0].backgroundColor =
        this.getRandomColorEachSection(this.allConversationsPerQueue.length);
      this.chatsPerQueueDailyOpenChartData.datasets[0].data =
        this.allConversationsPerQueueOpen;
      console.log(
        "this is all the data",
        this.chatsPerQueueDailyOpenChartData.datasets[0].data
      );
      console.log(
        "this is all the background",
        this.chatsPerQueueDailyOpenChartData.datasets[0].backgroundColor
      );
    },
    allQueuesClosed() {
      this.chatsPerQueueDailyClosedChartData.labels = this.allQueuesClosed;
      console.log(
        "all channels",
        this.chatsPerQueueDailyClosedChartData.labels
      );
    },
    allConversationsPerQueueClosed() {
      this.chatsPerQueueDailyClosedChartData.datasets[0].backgroundColor =
        this.getRandomColorEachSection(
          this.allConversationsPerQueueClosed.length
        );
      this.chatsPerQueueDailyClosedChartData.datasets[0].data =
        this.allConversationsPerQueueClosed;
      console.log(
        "this is all the data",
        this.chatsPerQueueDailyClosedChartData.datasets[0].data
      );
      console.log(
        "this is all the background",
        this.chatsPerQueueDailyClosedChartData.datasets[0].backgroundColor
      );
    },
  },

  data() {
    return {
      chatsPerQueueDailyTotalChartData: {
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
      chatsPerQueueDailyClosedChartData: {
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
      chatsPerQueueDailyOpenChartData: {
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
      "allQueues",
      "allConversationsPerQueue",
      "allQueuesOpen",
      "allConversationsPerQueueOpen",
      "allQueuesClosed",
      "allConversationsPerQueueClosed",
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
