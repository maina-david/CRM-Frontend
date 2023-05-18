<template>
  <div class="flex border-b">
    <div>
      <h2 class="text-lg font-semibold py-2">Agent Data Analytics</h2>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <div class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden" s>
      <div>
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">Total Number of Calls</h2>
        </div>
        <PieChart
          :chartData="callsPerAgentDailyTotalChartData"
          v-if="
            this.callsPerAgentDailyTotalChartData.datasets[0].data?.length > 0
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
          :chartData="callsPerAgentDailyAnsweredChartData"
          v-if="
            this.callsPerAgentDailyAnsweredChartData.datasets[0].data?.length >
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
          :chartData="callsPerAgentDailyAbandonedChartData"
          v-if="
            this.callsPerAgentDailyAbandonedChartData.datasets[0].data?.length >
            0
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
        :tableData="agentKpiDaily"
      />
    </div>
    <div class="col-span-2">
      <AbandonRateCardAgent />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PieChart from "@/components/Graphics/PieChart";
import TimeDataTableCard from "@/components/cards/ContactCenterCards/DashboardCards/TimeDataTableCard.vue";
import AbandonRateCardAgent from "@/components/cards/ContactCenterCards/DashboardCards/AbandonRateCardAgent.vue";

export default {
  data() {
    return {
      timeTableHead: [
        "Agent Name",
        "Total Call",
        "Queue Time",
        "Call Time",
        "Hold Time",
        "Mute Time",
        "Time To Answer",
      ],
      callsPerAgentDailyTotalChartData: {
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
      callsPerAgentDailyAnsweredChartData: {
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
      callsPerAgentDailyAbandonedChartData: {
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  components: {
    PieChart,
    TimeDataTableCard,
    AbandonRateCardAgent,
  },
  created() {
    this.getAgentKpiDaily();
    /* console.log("agent Kpi", this.agentKpiDaily); */
    this.getCallsPerAgentDaily({ kpi: "total_call" });
    this.getCallsPerAgentDaily({ kpi: "ABANDONED" });
    this.getCallsPerAgentDaily({ kpi: "ANSWERED" });
  },
  watch: {
    callsPerAgentDailyTotalLabel: function (val) {
      console.log("changed date", val);
      this.callsPerAgentDailyTotalChartData.labels =
        this.callsPerAgentDailyTotalLabel;
      this.callsPerAgentDailyTotalChartData.datasets[0].data =
        this.callsPerAgentDailyTotalData;
      this.callsPerAgentDailyTotalChartData.datasets[0].label = "TOTAL CALLS";
    },
    callsPerAgentDailyTotalData: function (val) {
      console.log("changed date", val);
      this.callsPerAgentDailyTotalChartData.labels =
        this.callsPerAgentDailyTotalLabel;
      this.callsPerAgentDailyTotalChartData.datasets[0].data =
        this.callsPerAgentDailyTotalData;
      this.callsPerAgentDailyTotalChartData.datasets[0].backgroundColor = [];
      for (let i = 0; i < this.callsPerAgentDailyTotalData.length; i++) {
        this.callsPerAgentDailyTotalChartData.datasets[0].backgroundColor.push(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      }
      this.callsPerAgentDailyTotalChartData.datasets[0].label = "TOTAL CALLS";
    },

    callsPerAgentDailyAnsweredLabel: function (val) {
      console.log("changed date", val);
      this.callsPerAgentDailyAnsweredChartData.labels =
        this.callsPerAgentDailyAnsweredLabel;
      this.callsPerAgentDailyAnsweredChartData.datasets[0].data =
        this.callsPerAgentDailyAnsweredData;
      this.callsPerAgentDailyAnsweredChartData.datasets[0].label =
        "ANSWERED CALLS";
    },
    callsPerAgentDailyAnsweredData: function (val) {
      console.log("changed date", val);
      this.callsPerAgentDailyAnsweredChartData.labels =
        this.callsPerAgentDailyAnsweredLabel;
      this.callsPerAgentDailyAnsweredChartData.datasets[0].data =
        this.callsPerAgentDailyAnsweredData;
      this.callsPerAgentDailyAnsweredChartData.datasets[0].backgroundColor = [];
      for (let i = 0; i < this.callsPerAgentDailyAnsweredData.length; i++) {
        this.callsPerAgentDailyAnsweredChartData.datasets[0].backgroundColor.push(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      }
      this.callsPerAgentDailyAnsweredChartData.datasets[0].label =
        "ANSWERED CALLS";
    },

    callsPerAgentDailyAbandonedLabel: function (val) {
      console.log("changed date", val);
      this.callsPerAgentDailyAbandonedChartData.labels =
        this.callsPerAgentDailyAbandonedLabel;
      this.callsPerAgentDailyAbandonedChartData.datasets[0].data =
        this.callsPerAgentDailyAbandonedData;
      this.callsPerAgentDailyAbandonedChartData.datasets[0].label =
        "ABANDONED CALLS";
    },
    callsPerAgentDailyAbandonedData: function (val) {
      console.log("changed date", val);
      this.callsPerAgentDailyAbandonedChartData.labels =
        this.callsPerAgentDailyAbandonedLabel;
      this.callsPerAgentDailyAbandonedChartData.datasets[0].data =
        this.callsPerAgentDailyAbandonedData;
      this.callsPerAgentDailyAbandonedChartData.datasets[0].backgroundColor =
        [];
      for (let i = 0; i < this.callsPerAgentDailyAbandonedData.length; i++) {
        this.callsPerAgentDailyAbandonedChartData.datasets[0].backgroundColor.push(
          "#" + Math.floor(Math.random() * 16777215).toString(16)
        );
      }
      this.callsPerAgentDailyAbandonedChartData.datasets[0].label =
        "ABANDONED CALLS";
    },
  },
  computed: {
    ...mapGetters([
      "agentKpiDaily",
      "callsPerAgentDailyTotalLabel",
      "callsPerAgentDailyTotalData",
      "callsPerAgentDailyAbandonedLabel",
      "callsPerAgentDailyAbandonedData",
      "callsPerAgentDailyAnsweredLabel",
      "callsPerAgentDailyAnsweredData",
    ]),
  },
  methods: {
    ...mapActions(["getAgentKpiDaily", "getCallsPerAgentDaily"]),
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
