<template>
  <div class="flex border-b">
    <div>
      <h2 class="text-lg font-semibold py-2">Channel Chat Data Analytics</h2>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <div class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden" s>
      <div>
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">Total Number of Conversations</h2>
        </div>
        <PieChart
          :chartData="chatsPerChannelDailyTotalChartData"
          v-if="
            this.chatsPerChannelDailyTotalChartData.datasets[0].data?.length > 0
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
          :chartData="chatsPerChannelDailyClosedChartData"
          v-if="
            this.chatsPerChannelDailyClosedChartData.datasets[0].data?.length >
            0
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
          :chartData="chatsPerChannelDailyOpenChartData"
          v-if="
            this.chatsPerChannelDailyOpenChartData.datasets[0].data?.length > 0
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
    allChannels() {
      this.chatsPerChannelDailyTotalChartData.labels = this.allChannels;
      console.log(
        "all channels",
        this.chatsPerChannelDailyTotalChartData.labels
      );
    },
    allConversationsPerChannel() {
      this.chatsPerChannelDailyTotalChartData.datasets[0].backgroundColor =
        this.getRandomColorEachSection(this.allConversationsPerChannel.length);
      this.chatsPerChannelDailyTotalChartData.datasets[0].data =
        this.allConversationsPerChannel;
      console.log(
        "this is all the data",
        this.chatsPerChannelDailyTotalChartData.datasets[0].data
      );
      console.log(
        "this is all the background",
        this.chatsPerChannelDailyTotalChartData.datasets[0].backgroundColor
      );
    },
    allChannelsOpen() {
      this.chatsPerChannelDailyOpenChartData.labels = this.allChannelsOpen;
      console.log(
        "all channels",
        this.chatsPerChannelDailyOpenChartData.labels
      );
    },
    allConversationsPerChannelOpen() {
      this.chatsPerChannelDailyOpenChartData.datasets[0].backgroundColor =
        this.getRandomColorEachSection(
          this.allConversationsPerChannelOpen.length
        );
      this.chatsPerChannelDailyOpenChartData.datasets[0].data =
        this.allConversationsPerChannelOpen;
      console.log(
        "this is all the data",
        this.chatsPerChannelDailyOpenChartData.datasets[0].data
      );
      console.log(
        "this is all the background",
        this.chatsPerChannelDailyOpenChartData.datasets[0].backgroundColor
      );
    },
    allChannelsClosed() {
      this.chatsPerChannelDailyClosedChartData.labels = this.allChannelsClosed;
      console.log(
        "all channels",
        this.chatsPerChannelDailyClosedChartData.labels
      );
    },
    allConversationsPerChannelClosed() {
      this.chatsPerChannelDailyClosedChartData.datasets[0].backgroundColor =
        this.getRandomColorEachSection(
          this.allConversationsPerChannelClosed.length
        );
      this.chatsPerChannelDailyClosedChartData.datasets[0].data =
        this.allConversationsPerChannelClosed;
      console.log(
        "this is all the data",
        this.chatsPerChannelDailyClosedChartData.datasets[0].data
      );
      console.log(
        "this is all the background",
        this.chatsPerChannelDailyClosedChartData.datasets[0].backgroundColor
      );
    },
  },
  data() {
    return {
      chatsPerChannelDailyTotalChartData: {
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
      chatsPerChannelDailyClosedChartData: {
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
      chatsPerChannelDailyOpenChartData: {
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
  created() {},
  computed: {
    ...mapGetters([
      "allChannels",
      "allConversationsPerChannel",
      "allChannelsOpen",
      "allConversationsPerChannelOpen",
      "allChannelsClosed",
      "allConversationsPerChannelClosed",
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
