<template>
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
        class="w-6/12"
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
      <ActionButton text="Export"></ActionButton>
    </div>
  </div>
  <div class="">
    <div class="grid grid-cols-2 gap-5"></div>
  </div>
  <div v-if="visual == 'graphic'">
    <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="p-2 border-b">
        <h2 class="text-sm font-normal">TOTAL CHATS</h2>
      </div>
      <BarChart :chartData="queueAnsweredChartData" />
    </div>
    <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="p-2 border-b">
        <h2 class="text-sm font-normal">ONGOING CHATS</h2>
      </div>
      <BarChart :chartData="queueAbandonedChartData" />
    </div>
    <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="p-2 border-b">
        <h2 class="text-sm font-normal">CLOSED CHATS</h2>
      </div>
      <BarChart :chartData="queueTotalCallChartData" />
    </div>
    <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="p-2 border-b">
        <h2 class="text-sm font-normal">AHT</h2>
      </div>
      <BarChart :chartData="queueAHTChartData" />
    </div>
    <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="p-2 border-b">
        <h2 class="text-sm font-normal">AVERAGE QUEUE TIME</h2>
      </div>
      <BarChart :chartData="queueCallTimeChartData" />
    </div>
  </div>
  <div v-if="visual == 'tabular'">
    <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="p-2 border-b">
        <h2 class="text-sm font-normal">TOTAL CHATS</h2>
      </div>
      <AgentReportsTable
        :tableHead="queueAnsweredChartData.labels"
        :tableData="queueAnsweredChartData"
        :period="period"
      />
    </div>
    <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="p-2 border-b">
        <h2 class="text-sm font-normal">ONGOING CHATS</h2>
      </div>
      <AgentReportsTable
        :tableHead="queueAbandonedChartData.labels"
        :tableData="queueAbandonedChartData"
        :period="period"
      />
    </div>
    <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="p-2 border-b">
        <h2 class="text-sm font-normal">CLOSED CHATS</h2>
      </div>
      <AgentReportsTable
        :tableHead="queueTotalCallChartData.labels"
        :tableData="queueTotalCallChartData"
        :period="period"
      />
    </div>
    <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="p-2 border-b">
        <h2 class="text-sm font-normal">AHT</h2>
      </div>
      <AgentReportsTable
        :tableHead="queueAHTChartData.labels"
        :tableData="queueAHTChartData"
        :period="period"
      />
    </div>
    <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
      <div class="p-2 border-b">
        <h2 class="text-sm font-normal">AVERAGE QUEUE TIME</h2>
      </div>
      <AgentReportsTable
        :tableHead="queueCallTimeChartData.labels"
        :tableData="queueCallTimeChartData"
        :period="period"
      />
    </div>
  </div>
  <ReportSelectQueues :show="showSelectQueuesModal" />
</template>

<script>
import BarChart from "@/components/Graphics/BarChart";
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
import moment from "moment";
import DatePick from "@/components/DatePick.vue";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";
import ReportSelectQueues from "@/components/modals/ContactCenterModals/ReportSelectQueues.vue";
import AgentReportsTable from "@/components/tables/ContactCenterTables/AgentReportsTable.vue";

export default {
  data() {
    return {
      date: "",
      timeFrames: [
        { label: "Daily", value: "day" },
        { label: "Weekly", value: "week" },
        { label: "Monthly", value: "month" },
        { label: "Annually", value: "year" },
      ],
      visualOptions: [
        { label: "Tabular", value: "tabular" },
        { label: "Graphic", value: "graphic" },
      ],
      visual: "",
      period: "",
      queueAnsweredChartData: {
        labels: [],
        datasets: [
          {
            label: "ANSWERED CALLS",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      queueAbandonedChartData: {
        labels: [],
        datasets: [
          {
            label: "ABANDONED CALLS",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      queueTotalCallChartData: {
        labels: [],
        datasets: [
          {
            label: "TOTAL CALLS",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      queueAHTChartData: {
        labels: [],
        datasets: [
          {
            label: "AHT",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      queueCallTimeChartData: {
        labels: [],
        datasets: [
          {
            label: "CALL TIME",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      queueHoldTimeChartData: {
        labels: [],
        datasets: [
          {
            label: "HOLD TIME",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      queueMuteTimeChartData: {
        labels: [],
        datasets: [
          {
            label: "MUTE TIME",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      queueServiceLevelChartData: {
        labels: [],
        datasets: [
          {
            label: "SERVICE LEVEL",
            backgroundColor: "#f87979",
            data: [],
          },
        ],
      },
      queueFirstCallChartData: {
        labels: [],
        datasets: [
          {
            label: "FIRST CALL",
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
    BarChart,
    DatePick,
    ActionButton,
    Dropdown,
    ReportSelectQueues,
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
      this.getQueueAnsweredReport({
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
      this.getQueueAbandonedReport({
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
      this.getQueueTotalCallReport({
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
      this.getQueueAHTReport({
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
      this.getQueueCallTimeReport({
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
      this.getQueueHoldTimeReport({
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
      this.getQueueMuteTimeReport({
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
      this.getQueueServiceLevelReport({
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
      this.getQueueFirstCallReport({
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
    queueAnsweredLabel: function (val) {
      console.log("changed answered calls data", val);
    },
    queueAnsweredData: function (val) {
      console.log("changed date", val);
      this.queueAnsweredChartData.labels = [];
      this.queueAnsweredChartData.datasets = [];
      this.queueAnsweredChartData.labels = Object.values(val.date);
      console.log("answered chart labels", this.queueAnsweredChartData.labels);
      for (const [key, value] of Object.entries(val.queue)) {
        console.log("queue:", key);
        console.log("data: ", value);
        this.queueAnsweredChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    queueAbandonedLabel: function (val) {
      console.log("changed date", val);
    },
    queueAbandonedData: function (val) {
      console.log("changed date", val);
      this.queueAnsweredChartData.labels = [];
      this.queueAbandonedChartData.datasets = [];
      this.queueAbandonedChartData.labels = Object.values(val.date);
      console.log("chart labels", this.queueAbandonedChartData.labels);
      for (const [key, value] of Object.entries(val.queue)) {
        console.log("queue:", key);
        console.log("data: ", value);
        this.queueAbandonedChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    queueTotalCallLabel: function (val) {
      console.log("changed date", val);
    },
    queueTotalCallData: function (val) {
      console.log("changed date", val);

      this.queueTotalCallChartData.labels = [];
      this.queueTotalCallChartData.datasets = [];
      this.queueTotalCallChartData.labels = Object.values(val.date);
      console.log("chart labels", this.queueTotalCallChartData.labels);
      for (const [key, value] of Object.entries(val.queue)) {
        console.log("queue:", key);
        console.log("data: ", value);
        this.queueTotalCallChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    queueAHTLabel: function (val) {
      console.log("changed date", val);
    },
    queueAHTData: function (val) {
      console.log("changed date", val);

      this.queueAHTChartData.labels = [];
      this.queueAHTChartData.datasets = [];
      this.queueAHTChartData.labels = Object.values(val.date);
      console.log("chart labels", this.queueAHTChartData.labels);
      for (const [key, value] of Object.entries(val.queue)) {
        console.log("queue:", key);
        console.log("data: ", value);
        this.queueAHTChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    queueCallTimeLabel: function (val) {
      console.log("changed date", val);
    },
    queueCallTimeData: function (val) {
      console.log("changed date", val);
      this.queueCallTimeChartData.labels = this.queueCallTimeLabel;
      this.queueCallTimeChartData.datasets[0].data = this.queueCallTimeData;
      this.queueCallTimeChartData.datasets[0].label = "CALL TIME";
      this.queueCallTimeChartData.labels = [];
      this.queueCallTimeChartData.datasets = [];
      this.queueCallTimeChartData.labels = Object.values(val.date);
      console.log("chart labels", this.queueCallTimeChartData.labels);
      for (const [key, value] of Object.entries(val.queue)) {
        console.log("queue:", key);
        console.log("data: ", value);
        this.queueCallTimeChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    queueHoldTimeLabel: function (val) {
      console.log("changed date", val);
    },
    queueHoldTimeData: function (val) {
      console.log("changed date", val);

      this.queueHoldTimeChartData.labels = [];
      this.queueHoldTimeChartData.datasets = [];
      this.queueHoldTimeChartData.labels = Object.values(val.date);
      console.log("chart labels", this.queueHoldTimeChartData.labels);
      for (const [key, value] of Object.entries(val.queue)) {
        console.log("queue:", key);
        console.log("data: ", value);
        this.queueHoldTimeChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    queueMuteTimeLabel: function (val) {
      console.log("changed date", val);
    },
    queueMuteTimeData: function (val) {
      console.log("changed date", val);
      this.queueMuteTimeChartData.labels = [];
      this.queueMuteTimeChartData.datasets = [];
      this.queueMuteTimeChartData.labels = Object.values(val.date);
      console.log("chart labels", this.queueMuteTimeChartData.labels);
      for (const [key, value] of Object.entries(val.queue)) {
        console.log("queue:", key);
        console.log("data: ", value);
        this.queueMuteTimeChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    queueServiceLevelLabel: function (val) {
      console.log("changed date", val);
    },
    queueServiceLevelData: function (val) {
      console.log("changed date", val);
      this.queueServiceLevelChartData.labels = [];
      this.queueServiceLevelChartData.datasets = [];
      this.queueServiceLevelChartData.labels = Object.values(val.date);
      console.log("chart labels", this.queueServiceLevelChartData.labels);
      for (const [key, value] of Object.entries(val.queue)) {
        console.log("queue:", key);
        console.log("data: ", value);
        this.queueServiceLevelChartData.datasets.push({
          label: key,
          backgroundColor:
            "#" + Math.floor(Math.random() * 16777215).toString(16),
          data: Object.values(value),
        });
      }
    },

    queueFirstCallLabel: function (val) {
      console.log("changed date", val);
    },
    queueFirstCallData: function (val) {
      console.log("changed date", val);
      this.queueFirstCallChartData.labels = [];
      this.queueFirstCallChartData.datasets = [];
      this.queueFirstCallChartData.labels = Object.values(val.date);
      console.log("chart labels", this.queueFirstCallChartData.labels);
      for (const [key, value] of Object.entries(val.queue)) {
        console.log("queue:", key);
        console.log("data: ", value);
        this.queueFirstCallChartData.datasets.push({
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
      "getQueueAnsweredReport",
      "getQueueAbandonedReport",
      "getQueueTotalCallReport",
      "getQueueAHTReport",
      "getQueueCallTimeReport",
      "getQueueHoldTimeReport",
      "getQueueMuteTimeReport",
      "getQueueServiceLevelReport",
      "getQueueFirstCallReport",
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
      "queueAnsweredLabel",
      "queueAnsweredData",
      "queueAbandonedLabel",
      "queueAbandonedData",
      "queueTotalCallLabel",
      "queueTotalCallData",
      "queueAHTLabel",
      "queueAHTData",
      "queueCallTimeLabel",
      "queueCallTimeData",
      "queueHoldTimeLabel",
      "queueHoldTimeData",
      "queueMuteTimeLabel",
      "queueMuteTimeData",
      "queueServiceLevelLabel",
      "queueServiceLevelData",
      "queueFirstCallLabel",
      "queueFirstCallData",
    ]),
  },
  setup() {
    const showSelectQueuesModal = ref(false);

    return {
      showSelectQueuesModal,
    };
  },
};
</script>

<style></style>
