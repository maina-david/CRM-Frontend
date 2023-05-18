<template>
  <div class="flex border-b">
    <div>
      <h2 class="text-lg font-semibold py-2">Queue Data Analytics</h2>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <div class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden" s>
      <div>
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">Total Number of Calls</h2>
        </div>
        <PieChart
          :chartData="callsPerQueueDailyTotalChartData"
          v-if="
            this.callsPerQueueDailyTotalChartData.datasets[0].data?.length > 0
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
          <h2 class="text-sm font-normal">Answered Calls</h2>
        </div>
        <PieChart
          :chartData="callsPerQueueDailyAnsweredChartData"
          v-if="
            this.callsPerQueueDailyAnsweredChartData.datasets[0].data?.length >
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
          <h2 class="text-sm font-normal">Abandoned Calls</h2>
        </div>
        <PieChart
          :chartData="callsPerQueueDailyAbandonedChartData"
          v-if="
            this.callsPerQueueDailyAbandonedChartData.datasets[0].data?.length >
            0
          "
        />
        <div v-else class="flex justify-center text-sm m-3">
          There is no data to display
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-4 gap-5">
    <div class="col-span-2 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">Service Level</h2>
        </div>
        <BarChart
          :chartData="serviceLevelDailyChartData"
          v-if="this.serviceLevelDailyChartData?.datasets[0].data?.length > 0"
        />
        <div v-else class="flex justify-center text-sm m-3">
          There is no data to display
        </div>
      </div>
    </div>
    <div class="col-span-2 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">First Call Resolution</h2>
        </div>
        <BarChart
          :chartData="firstCallResolutionDailyChartData"
          v-if="
            this.firstCallResolutionDailyChartData?.datasets[0].data?.length > 0
          "
        />
        <div v-else class="flex justify-center text-sm m-3">
          There is no data to display
        </div>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-5 gap-5">
    <div class="col-span-3 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <TimeDataTableCard
        :tableHead="timeTableHead"
        :tableData="queueKpiDaily"
      />
    </div>
    <div class="col-span-2">
      <AbandonRateCardQueue />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PieChart from "@/components/Graphics/PieChart";
import BarChart from "@/components/Graphics/BarChart";
import TimeDataTableCard from "@/components/cards/ContactCenterCards/DashboardCards/TimeDataTableCard.vue";
import AbandonRateCardQueue from "@/components/cards/ContactCenterCards/DashboardCards/AbandonRateCardQueue.vue";

export default {
  data() {
    return {
      timeTableHead: [
        "Queue Name",
        "Total Call",
        "Queue Time",
        "Call Time",
        "Hold Time",
        "Mute Time",
      ],
      callsPerQueueDailyTotalChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: "TOTAL CALLS",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      callsPerQueueDailyAnsweredChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: "ANSWERED CALLS",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      callsPerQueueDailyAbandonedChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [],
        datasets: [
          {
            label: "ABANDONED CALLS",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      serviceLevelDailyChartData: {
        labels: [],
        datasets: [
          {
            label: "SERVICE LEVEL",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      firstCallResolutionDailyChartData: {
        labels: [],
        datasets: [
          {
            label: "FIRST CALL RESOLUTION",
            backgroundColor: "#f87979",
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
    BarChart,
    TimeDataTableCard,
    AbandonRateCardQueue,
  },
  created() {
    this.getServiceLevelDaily();
    this.getFirstCallResolutionDaily();
    this.getQueueKpiDaily();
    this.getCallsPerQueue({ kpi: "total_call" });
    this.getCallsPerQueue({ kpi: "ABANDONED" });
    this.getCallsPerQueue({ kpi: "ANSWERED" });
  },
  watch: {
    callsPerQueueDailyTotalLabel: function (val) {
      console.log("changed date", val);
      this.callsPerQueueDailyTotalChartData.labels =
        this.callsPerQueueDailyTotalLabel;
      this.callsPerQueueDailyTotalChartData.datasets[0].data =
        this.callsPerQueueDailyTotalData;
      this.callsPerQueueDailyTotalChartData.datasets[0].label = "TOTAL CALLS";
    },
    callsPerQueueDailyTotalData: function (val) {
      console.log("changed date", val);
      this.callsPerQueueDailyTotalChartData.labels =
        this.callsPerQueueDailyTotalLabel;
      this.callsPerQueueDailyTotalChartData.datasets[0].data =
        this.callsPerQueueDailyTotalData;
      this.callsPerQueueDailyTotalChartData.datasets[0].backgroundColor = [];
      for (let i = 0; i < this.callsPerQueueDailyTotalData.length; i++) {
        this.callsPerQueueDailyTotalChartData.datasets[0].backgroundColor.push(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      }
      this.callsPerQueueDailyTotalChartData.datasets[0].label = "TOTAL CALLS";
    },

    callsPerQueueDailyAnsweredLabel: function (val) {
      console.log("changed date", val);
      this.callsPerQueueDailyAnsweredChartData.labels =
        this.callsPerQueueDailyAnsweredLabel;
      this.callsPerQueueDailyAnsweredChartData.datasets[0].data =
        this.callsPerQueueDailyAnsweredData;

      this.callsPerQueueDailyAnsweredChartData.datasets[0].label =
        "ANSWERED CALLS";
    },
    callsPerQueueDailyAnsweredData: function (val) {
      console.log("changed date", val);
      this.callsPerQueueDailyAnsweredChartData.labels =
        this.callsPerQueueDailyAnsweredLabel;
      this.callsPerQueueDailyAnsweredChartData.datasets[0].data =
        this.callsPerQueueDailyAnsweredData;
      this.callsPerQueueDailyAnsweredChartData.datasets[0].backgroundColor = [];
      for (let i = 0; i < this.callsPerQueueDailyAnsweredData.length; i++) {
        this.callsPerQueueDailyAnsweredChartData.datasets[0].backgroundColor.push(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      }
      this.callsPerQueueDailyAnsweredChartData.datasets[0].label =
        "ANSWERED CALLS";
    },

    callsPerQueueDailyAbandonedLabel: function (val) {
      console.log("changed date", val);
      this.callsPerQueueDailyAbandonedChartData.labels =
        this.callsPerQueueDailyAbandonedLabel;
      this.callsPerQueueDailyAbandonedChartData.datasets[0].data =
        this.callsPerQueueDailyAbandonedData;
      this.callsPerQueueDailyAbandonedChartData.datasets[0].backgroundColor =
        [];
      for (let i = 0; i < this.callsPerQueueDailyAbandonedData.length; i++) {
        this.callsPerQueueDailyAbandonedChartData.datasets[0].backgroundColor.push(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      }
      this.callsPerQueueDailyAbandonedChartData.datasets[0].label =
        "ABANDONED CALLS";
    },
    callsPerQueueDailyAbandonedData: function (val) {
      console.log("changed date", val);
      this.callsPerQueueDailyAbandonedChartData.labels =
        this.callsPerQueueDailyAbandonedLabel;
      this.callsPerQueueDailyAbandonedChartData.datasets[0].data =
        this.callsPerQueueDailyAbandonedData;

      this.callsPerQueueDailyAbandonedChartData.datasets[0].label =
        "ABANDONED CALLS";
    },

    serviceLevelDailyLabel: function (val) {
      console.log("changed date", val);
      this.serviceLevelDailyChartData.labels = this.serviceLevelDailyLabel;
      this.serviceLevelDailyChartData.datasets[0].data =
        this.serviceLevelDailyData;
      this.serviceLevelDailyChartData.datasets[0].label = "SERVICE LEVEL";
    },
    serviceLevelDailyData: function (val) {
      console.log("changed date", val);
      this.serviceLevelDailyChartData.labels = this.serviceLevelDailyLabel;
      this.serviceLevelDailyChartData.datasets[0].data =
        this.serviceLevelDailyData;
      this.serviceLevelDailyChartData.datasets[0].backgroundColor = [];
      for (let i = 0; i < this.serviceLevelDailyData.length; i++) {
        this.serviceLevelDailyChartData.datasets[0].backgroundColor.push(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      }
      this.serviceLevelDailyChartData.datasets[0].label = "SERVICE LEVEL";
    },

    firstCallResolutionDailyLabel: function (val) {
      console.log("changed date", val);
      this.firstCallResolutionDailyChartData.labels =
        this.firstCallResolutionDailyLabel;
      this.firstCallResolutionDailyChartData.datasets[0].data =
        this.firstCallResolutionDailyData;

      this.firstCallResolutionDailyChartData.datasets[0].label =
        "FIRST CALL RESOLUTION";
    },
    firstCallResolutionDailyData: function (val) {
      console.log("changed date", val);
      this.firstCallResolutionDailyChartData.labels =
        this.firstCallResolutionDailyLabel;
      this.firstCallResolutionDailyChartData.datasets[0].data =
        this.firstCallResolutionDailyData;
      this.firstCallResolutionDailyChartData.datasets[0].backgroundColor = [];
      for (let i = 0; i < this.firstCallResolutionDailyData.length; i++) {
        this.firstCallResolutionDailyChartData.datasets[0].backgroundColor.push(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      }
      this.firstCallResolutionDailyChartData.datasets[0].label =
        "FIRST CALL RESOLUTION";
    },
  },
  computed: {
    ...mapGetters([
      "queueKpiDaily",
      "callsPerQueueDailyTotalLabel",
      "callsPerQueueDailyTotalData",
      "callsPerQueueDailyAbandonedLabel",
      "callsPerQueueDailyAbandonedData",
      "callsPerQueueDailyAnsweredLabel",
      "callsPerQueueDailyAnsweredData",
      "serviceLevelDailyLabel",
      "serviceLevelDailyData",
      "firstCallResolutionDailyLabel",
      "firstCallResolutionDailyData",
    ]),
  },
  methods: {
    ...mapActions([
      "getQueueKpiDaily",
      "getCallsPerQueue",
      "getServiceLevelDaily",
      "getFirstCallResolutionDaily",
    ]),
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
