<template>
  <div class="m-5">
    <div class="flex justify-between border-b mt-10">
      <div class="flex gap-5">
        <div
          class="text-md font-medium text-center mt-5 text-gray-600 dark:text-gray-400 dark:border-gray-700"
        >
          Select Period to Populate Report:
        </div>
        <Dropdown
          class="w-4/12"
          select="Select Visual to Show"
          placeholder="Select Visual"
          :options="visualOptions"
          v-model="visual"
        />
        <Dropdown
          class="w-4/12"
          select="Select Period"
          placeholder="Select Period"
          :options="timeFrames"
          v-model="period"
        />
        <div class="mt-7 w-6/12">
          <DatePick v-model="date" :format="period" />
        </div>
      </div>
      <div class="m-4 flex gap-3">
        <ActionButton
          text="Select Agents"
          @click="showSelectAgentsModal = !showSelectAgentsModals"
        />
        <ActionButton text="Export"></ActionButton>
      </div>
    </div>
    <div v-if="visual == 'graphic'">
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">ANSWERED CALLS</h2>
        </div>
        <BarChart :chartData="agentAnsweredChartData" />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">ABANDONED CALLS</h2>
        </div>
        <BarChart :chartData="agentAbandonedChartData" />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">TOTAL CALLS</h2>
        </div>
        <BarChart :chartData="agentTotalCallChartData" />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">AHT</h2>
        </div>
        <BarChart :chartData="agentAHTChartData" />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">CALL TIME</h2>
        </div>
        <BarChart :chartData="agentCallTimeChartData" />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">HOLD TIME</h2>
        </div>
        <BarChart :chartData="agentHoldTimeChartData" />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">MUTE TIME</h2>
        </div>
        <BarChart :chartData="agentMuteTimeChartData" />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">TIME TO ANSWER</h2>
        </div>
        <BarChart :chartData="agentTimeToAnswerChartData" />
      </div>
    </div>
    <div v-if="visual == 'tabular'">
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">ANSWERED CALLS</h2>
        </div>
        {{ agentAnsweredChartData.labels }}

        <AgentReportsTable
          :tableHead="agentAnsweredChartData.labels"
          :tableData="agentAnsweredChartData"
          :period="period"
        />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">ABANDONED CALLS</h2>
        </div>
        <AgentReportsTable
          :tableHead="agentAbandonedChartData.labels"
          :tableData="agentAbandonedChartData"
          :period="period"
        />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">TOTAL CALLS</h2>
        </div>
        <AgentReportsTable
          :tableHead="agentTotalCallChartData.labels"
          :tableData="agentTotalCallChartData"
          :period="period"
        />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">AHT</h2>
        </div>
        <AgentReportsTable
          :tableHead="agentAHTChartData.labels"
          :tableData="agentAHTChartData"
          :period="period"
        />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">CALL TIME</h2>
        </div>
        <AgentReportsTable
          :tableHead="agentCallTimeChartData.labels"
          :tableData="agentCallTimeChartData"
          :period="period"
        />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">HOLD TIME</h2>
        </div>
        <AgentReportsTable
          :tableHead="agentHoldTimeChartData.labels"
          :tableData="agentHoldTimeChartData"
          :period="period"
        />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">MUTE TIME</h2>
        </div>
        <AgentReportsTable
          :tableHead="agentMuteTimeChartData.labels"
          :tableData="agentMuteTimeChartData"
          :period="period"
        />
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">TIME TO ANSWER</h2>
        </div>
        <AgentReportsTable
          :tableHead="agentTimeToAnswerChartData.labels"
          :tableData="agentTimeToAnswerChartData"
          :period="period"
        />
      </div>
    </div>
  </div>
  <ReportSelectAgents :show="showSelectAgentsModal" />
</template>

<script>
import BarChart from "@/components/Graphics/BarChart";
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
import moment from "moment";
import DatePick from "@/components/DatePick.vue";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";
import AgentReportsTable from "@/components/tables/ContactCenterTables/AgentReportsTable.vue";
import ReportSelectAgents from "@/components/modals/ContactCenterModals/ReportSelectAgents.vue";

export default {
  data() {
    return {
      date: "",
      visualOptions: [
        { label: "Tabular", value: "tabular" },
        { label: "Graphic", value: "graphic" },
      ],
      visual: "",
      options: [
        { label: "Queue 1", value: "Queue 1" },
        { label: "Queue 2", value: "Queue 2" },
        { label: "Queue 3", value: "Queue 3" },
        { label: "Queue 4", value: "Queue 4" },
      ],
      timeFrames: [
        { label: "Daily", value: "day" },
        { label: "Weekly", value: "week" },
        { label: "Monthly", value: "month" },
        { label: "Annually", value: "year" },
      ],
      tableHead: ["Day", "AGENT 1", "AGENT 2"],
      period: "",
      agentAnsweredChartData: {
        labels: [],
        datasets: [],
      },
      agentAbandonedChartData: {
        labels: [],
        datasets: [],
      },
      agentTotalCallChartData: {
        labels: [],
        datasets: [],
      },
      agentAHTChartData: {
        labels: [],
        datasets: [],
      },
      agentCallTimeChartData: {
        labels: [],
        datasets: [],
      },
      agentHoldTimeChartData: {
        labels: [],
        datasets: [],
      },
      agentMuteTimeChartData: {
        labels: [],
        datasets: [],
      },
      agentTimeToAnswerChartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  components: {
    BarChart,
    DatePick,
    ActionButton,
    Dropdown,
    ReportSelectAgents,
    AgentReportsTable,
  },
  created() {
    this.date = moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format(
      "yyyy-MM"
    );
    this.period = "month";
  },
  watch: {
    date: function (val) {
      console.log("changed date", val);
      this.getAgentAnsweredReport({
        frequency:
          this.period == "day"
            ? "daily"
            : this.period == "week"
            ? "weekly"
            : this.period == "month"
            ? "monthly"
            : this.period == "year"
            ? "yearly"
            : "monthly",
        date: this.date,
      });
      this.getAgentAbandonedReport({
        frequency:
          this.period == "day"
            ? "daily"
            : this.period == "week"
            ? "weekly"
            : this.period == "month"
            ? "monthly"
            : this.period == "year"
            ? "yearly"
            : "monthly",
        date: this.date,
      });
      this.getAgentTotalCallReport({
        frequency:
          this.period == "day"
            ? "daily"
            : this.period == "week"
            ? "weekly"
            : this.period == "month"
            ? "monthly"
            : this.period == "year"
            ? "yearly"
            : "monthly",
        date: this.date,
      });
      this.getAgentAHTReport({
        frequency:
          this.period == "day"
            ? "daily"
            : this.period == "week"
            ? "weekly"
            : this.period == "month"
            ? "monthly"
            : this.period == "year"
            ? "yearly"
            : "monthly",
        date: this.date,
      });
      this.getAgentCallTimeReport({
        frequency:
          this.period == "day"
            ? "daily"
            : this.period == "week"
            ? "weekly"
            : this.period == "month"
            ? "monthly"
            : this.period == "year"
            ? "yearly"
            : "monthly",
        date: this.date,
      });
      this.getAgentHoldTimeReport({
        frequency:
          this.period == "day"
            ? "daily"
            : this.period == "week"
            ? "weekly"
            : this.period == "month"
            ? "monthly"
            : this.period == "year"
            ? "yearly"
            : "monthly",
        date: this.date,
      });
      this.getAgentMuteTimeReport({
        frequency:
          this.period == "day"
            ? "daily"
            : this.period == "week"
            ? "weekly"
            : this.period == "month"
            ? "monthly"
            : this.period == "year"
            ? "yearly"
            : "monthly",
        date: this.date,
      });
      this.getAgentTimeToAnswerReport({
        frequency:
          this.period == "day"
            ? "daily"
            : this.period == "week"
            ? "weekly"
            : this.period == "month"
            ? "monthly"
            : this.period == "year"
            ? "yearly"
            : "monthly",
        date: this.date,
      });
    },

    agentAnsweredData: function (val) {
      console.log("changed answered calls data", val);
      this.agentAnsweredChartData.labels = [];
      this.agentAnsweredChartData.datasets = [];
      this.agentAnsweredChartData.labels = Object.values(val.date);
      console.log("chart labels", this.agentAnsweredChartData.labels);
      for (const [key, value] of Object.entries(val.agent)) {
        console.log("agent:", key);
        console.log("data: ", JSON.stringify(value));
        this.agentAnsweredChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
      // this.agentAnsweredChartData.datasets[0].data = this.agentAnsweredData;
      // this.agentAnsweredChartData.datasets[0].label = "ANSWERED CALLS";
    },

    agentAbandonedData: function (val) {
      this.agentAbandonedChartData.labels = [];
      this.agentAbandonedChartData.datasets = [];
      this.agentAbandonedChartData.labels = Object.values(val.date);
      for (const [key, value] of Object.entries(val.agent)) {
        console.log("agent:", key);
        console.log("data: ", value);
        this.agentAbandonedChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    agentTotalCallData: function (val) {
      this.agentTotalCallChartData.labels = [];
      this.agentTotalCallChartData.datasets = [];
      this.agentTotalCallChartData.labels = Object.values(val.date);
      for (const [key, value] of Object.entries(val.agent)) {
        console.log("agent:", key);
        console.log("data: ", value);
        this.agentTotalCallChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    agentAHTData: function (val) {
      this.agentAHTChartData.labels = [];
      this.agentAHTChartData.datasets = [];
      this.agentAHTChartData.labels = Object.values(val.date);
      for (const [key, value] of Object.entries(val.agent)) {
        console.log("agent:", key);
        console.log("data: ", value);
        this.agentAHTChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    agentCallTimeData: function (val) {
      this.agentAnsweredChartData.labels = [];
      this.agentCallTimeChartData.datasets = [];
      this.agentCallTimeChartData.labels = Object.values(val.date);
      for (const [key, value] of Object.entries(val.agent)) {
        console.log("agent:", key);
        console.log("data: ", value);
        this.agentCallTimeChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    agentHoldTimeData: function (val) {
      this.agentHoldTimeChartData.labels = [];
      this.agentHoldTimeChartData.datasets = [];
      this.agentHoldTimeChartData.labels = Object.values(val.date);
      for (const [key, value] of Object.entries(val.agent)) {
        console.log("agent:", key);
        console.log("data: ", value);
        this.agentHoldTimeChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    agentMuteTimeData: function (val) {
      this.agentMuteTimeChartData.labels = [];
      console.log("this is the value of agent mute time", val);
      this.agentMuteTimeChartData.datasets = [];
      this.agentMuteTimeChartData.labels = Object.values(val.date);
      for (const [key, value] of Object.entries(val.agent)) {
        console.log("agent:", key);
        console.log("data: ", value);
        this.agentMuteTimeChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    agentTimeToAnswerData: function (val) {
      this.agentTimeToAnswerChartData.labels = [];
      this.agentTimeToAnswerChartData.datasets = [];
      this.agentTimeToAnswerChartData.labels = Object.values(val.date);
      for (const [key, value] of Object.entries(val.agent)) {
        console.log("agent:", key);
        console.log("data: ", value);
        this.agentTimeToAnswerChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },
  },
  methods: {
    ...mapActions([
      "getAgentAnsweredReport",
      "getAgentAbandonedReport",
      "getAgentTotalCallReport",
      "getAgentAHTReport",
      "getAgentCallTimeReport",
      "getAgentHoldTimeReport",
      "getAgentMuteTimeReport",
      "getAgentTimeToAnswerReport",
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
  computed: {
    ...mapGetters([
      "agentAnsweredData",

      "agentAbandonedLabel",
      "agentAbandonedData",
      "agentTotalCallLabel",
      "agentTotalCallData",
      "agentAHTLabel",
      "agentAHTData",
      "agentCallTimeLabel",
      "agentCallTimeData",
      "agentHoldTimeLabel",
      "agentHoldTimeData",
      "agentMuteTimeLabel",
      "agentMuteTimeData",
      "agentTimeToAnswerLabel",
      "agentTimeToAnswerData",
    ]),
  },
  setup() {
    const showSelectAgentsModal = ref(false);

    return {
      showSelectAgentsModal,
    };
  },
};
</script>

<style></style>
