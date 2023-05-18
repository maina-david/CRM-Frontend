<template>
  <div class="flex justify-between border-b mt-10 m-5">
    <div class="m-3 flex gap-4">
      <div
        class="text-md font-medium text-center mt-5 text-gray-600 dark:text-gray-400 dark:border-gray-700"
      >
        Select Period to Populate Report:

        <!-- <DatePick v-model="date" :format="period" /> -->
        <div class="m-3"><DateRangePicker v-model="date" /></div>
      </div>

      <!-- <Dropdown
        class="w-6/12"
        select="Select Period"
        placeholder="Select Period"
        :options="timeFrames"
        v-model="period"
      /> -->
      <Dropdown
        :options="SelectQueueOptions"
        label="Select The Queue Type"
        select="Select The Queue Type"
        v-model="queueType"
        @change="select_queue"
      />

      <Dropdown
        :options="SelectQueues"
        label="Select the quue"
        select="Select the queue"
        v-model="queueSelected"
      />
      <Dropdown
        :options="selectQualityAssuranceForm"
        label="Select the QA form"
        select="Select the QA form"
        v-model="qaFormSelected"
      />
    </div>
    <div class="m-4">
      <ActionButton text="Reset " @click="resetSelections"></ActionButton>
    </div>
    <div class="m-4">
      <ActionButton text="Load " @click="loadData"></ActionButton>
    </div>
    <div class="m-4">
      <ActionButton text="Export"></ActionButton>
    </div>
  </div>
  <div class="m-5 grid grid-cols-3 gap-6">
    <div class="col-span-1" v-for="question in reviewQuestions" :key="question">
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <div>
            <div class="p-2 border-b">
              <h2 class="text-sm font-normal">Review Question Report</h2>
            </div>
            <Dropdown
              class="flex justify-center"
              select="Select Review Question"
              placeholder="Select the Review Question"
              :options="selectReviewQuestion"
              v-model="option"
            />
            <div class="mt-5">
              <BarChart
                :chartData="reviewQuestionChartData"
                v-if="this.reviewQuestionChartData.datasets[0].data?.length > 0"
              />
              <div v-else class="flex justify-center text-sm m-3">
                There is no data to display
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-2">
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <AgentReportQuestionsTable
          v-if="qaFormSelected !== ''"
          :tableHead="AverageReviewPerAgentPerQuestionLabel"
          :tableData="AverageReviewPerAgentPerQuestionData"
        />
        <AgentReportTable
          v-else
          :tableHead="agentReportTableHead"
          :tableData="averageReviewPerAgent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import BarChart from "@/components/Graphics/BarChart";
import ActionButton from "@/components/ActionButton.vue";
// import DatePick from "@/components/DatePick.vue";
import DateRangePicker from "@/components/DateRangePicker.vue";
import Dropdown from "@/components/Dropdown.vue";
import { mapActions, mapGetters } from "vuex";
import AgentReportTable from "@/components/tables/QAManagementTables/AgentReportTable.vue";
import AgentReportQuestionsTable from "@/components/tables/QAManagementTables/AgentReportQuestionsTable.vue";

export default {
  data() {
    return {
      start: "",
      end: "",
      date: "",
      payload: "",
      SelectQueueOptions: [
        { label: "voice", value: "voice" },
        { label: "Chat", value: "chat" },
      ],
      qaFormSelected: "",
      qAQuestionSelected: "",
      queueSelected: "",
      queueType: "",
      timeFrames: [
        { label: "Daily", value: "day" },
        { label: "Weekly", value: "week" },
        { label: "Monthly", value: "month" },
        { label: "Annually", value: "year" },
      ],
      period: "",
      option: "",
      agentReportTableHead: [
        "Agent Name",
        "Average Total Score",
        "Number of Reviews",

        "action",
      ],
      agentReportTableData: [
        {
          name: "Jane the Reviewer",
          reviews_done: "45",
          avg_score: 25,
          total_score: "50",
          channel: "Voice",
          file_url:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        },
        {
          name: "John the Reviewer",
          reviews_done: "45",
          avg_score: 25,
          total_score: "50",
          channel: "Whatsapp",
        },
        {
          name: "Jane the Reviewer",
          reviews_done: "45",
          avg_score: 25,
          total_score: "50",
          channel: "Facebook",
        },
        {
          name: "John the Reviewer",
          reviews_done: "45",
          avg_score: 25,
          total_score: "50",
          channel: "Instagram",
        },
      ],
      selectReviewQuestion: [
        { label: "Did the agent start with greeting?", value: "45" },
        { label: "Fluency of the Agent", value: "35" },
        { label: "Did the Call take too long?", value: "26" },
        {
          label: "The agent clearly explained the solution to the customer",
          value: "73",
        },
        { label: "The agent thanked the customer for calling", value: "13" },
      ],
      reviewQuestionChartData: {
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      reviewQuestions: [
        {
          nameOfIVR: "First question",
          data: [60, 25, 15],
          labels: ["English", "Kiswahili", "French"],
        },
      ],
    };
  },
  watch: {
    averageReviewPerAgent: function (val) {
      console.log("I am getting changed data", val);
      this.reviewQuestionChartData.labels = [];
      this.reviewQuestionChartData.labels = this.averageReviewPerAgentLabels;
      this.reviewQuestionChartData.datasets[0].data = [];
      this.reviewQuestionChartData.datasets[0].data =
        this.averageReviewPerAgentData;
    },
  },
  created() {
    this.start = moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format(
      "yyyy-MM-DD"
    );
    this.end = moment(new Date().getTime()).format("yyyy-MM-DD");
    this.date = {
      start: this.start,
      end: this.end,
    };
    this.getQueues();
    this.getChatQueue();
    this.getQualityAssuranceForm();
  },

  components: {
    BarChart,
    ActionButton,
    AgentReportQuestionsTable,
    // DatePick,
    DateRangePicker,
    Dropdown,
    AgentReportTable,
  },

  computed: {
    ...mapGetters([
      "selectQueues",
      "selectChatQueues",
      "averageReviewPerAgent",
      "averageReviewPerAgentLabels",
      "averageReviewPerAgentData",
      "AverageReviewPerAgentPerQuestion",
      "selectQualityAssuranceForm",
      "AverageReviewPerAgentPerQuestionData",
      "AverageReviewPerAgentPerQuestionLabel",
    ]),
  },
  methods: {
    ...mapActions([
      "getQueues",
      "getChatQueue",
      "getAverageReviewPerAgent",
      "getAverageReviewPerAgentPerQuestion",
      "getQualityAssuranceForm",
    ]),
    loadData() {
      if (this.queueSelected !== "" && this.queueType !== "") {
        if (this.qaFormSelected !== "") {
          this.payload =
            "from=" +
            this.date.start +
            "&to=" +
            this.date.end +
            "&queue_type=" +
            this.queueType +
            "&queue_id=" +
            this.queueSelected;
          this.getAverageReviewPerAgent(this.payload);
          this.getAverageReviewPerAgentPerQuestion(
            this.payload + "&form_id=" + this.qaFormSelected
          );
        } else {
          console.log(
            "from=" +
              this.date.start +
              "&to=" +
              this.date.end +
              "&queue_type=" +
              this.queueType +
              "&queue_id=" +
              this.queueSelected
          );
          this.payload =
            "from=" +
            this.date.start +
            "&to=" +
            this.date.end +
            "&queue_type=" +
            this.queueType +
            "&queue_id=" +
            this.queueSelected;
        }
      } else {
        if (this.qaFormSelected !== "") {
          console.log("from=" + this.date.start + "&to=" + this.date.end);
          this.payload = "from=" + this.date.start + "&to=" + this.date.end;
          this.getAverageReviewPerAgent(this.payload);
          this.getAverageReviewPerAgentPerQuestion(
            this.payload + "&form_id=" + this.qaFormSelected
          );
        } else {
          console.log("from=" + this.date.start + "&to=" + this.date.end);
          this.payload = "from=" + this.date.start + "&to=" + this.date.end;
          this.getAverageReviewPerAgent(this.payload);
        }
      }
    },
    resetSelections() {
      this.queueSelected = "";
      this.queueType = "";
      this.qaFormSelected = "";
    },
    select_queue() {
      console.log("this is the new select option", this.queueType);
      if (this.queueType === "voice") {
        this.SelectQueues = this.selectQueues;
      } else if (this.queueType === "chat") {
        this.SelectQueues = this.selectChatQueues;
      }
    },
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
