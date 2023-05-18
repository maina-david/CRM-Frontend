<template>
  <div class="flex justify-between border-b mt-10 m-5">
    <div class="m-3 flex gap-4">
      <div
        class="text-md font-medium text-center mt-5 text-gray-600 dark:text-gray-400 dark:border-gray-700"
      >
        Select Period to Populate Report:
      </div>

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
              <PieChart
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
        <QueueReportTable
          :tableHead="queueReportTableHead"
          :tableData="queueReportTableData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import PieChart from "@/components/Graphics/PieChart";
import ActionButton from "@/components/ActionButton.vue";
import DatePick from "@/components/DatePick.vue";
import Dropdown from "@/components/Dropdown.vue";
import QueueReportTable from "@/components/tables/QAManagementTables/QueueReportTable.vue";

export default {
  data() {
    return {
      start: "",
      end: "",
      date: "",
      timeFrames: [
        { label: "Daily", value: "day" },
        { label: "Weekly", value: "week" },
        { label: "Monthly", value: "month" },
        { label: "Annually", value: "year" },
      ],
      period: "",
      option: "",
      queueReportTableHead: [
        "Queue Name",
        "Average Total Score",
        "Number of Reviews",
      ],
      queueReportTableData: [
        {
          name: "Jane the Reviewer",
          reviews_done: "45",
          avg_score: 25,
          total_score: "50",
        },
        {
          name: "John the Reviewer",
          reviews_done: "45",
          avg_score: 25,
          total_score: "50",
        },
        {
          name: "Jane the Reviewer",
          reviews_done: "45",
          avg_score: 25,
          total_score: "50",
        },
        {
          name: "John the Reviewer",
          reviews_done: "45",
          avg_score: 25,
          total_score: "50",
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
        labels: ["Queue 1", "Queue 2", "Queue 3"],
        datasets: [
          {
            label: "TOTAL CALLS",
            backgroundColor: "#f87979",
            data: [45, 63, 12],
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
  created() {
    this.start = moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format(
      "yyyy-MM-DD"
    );
    this.end = moment(new Date().getTime()).format("yyyy-MM-DD");
    this.date = {
      start: this.start,
      end: this.end,
    };
  },

  components: {
    PieChart,
    ActionButton,
    DatePick,
    Dropdown,
    QueueReportTable,
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
  computed: {},
};
</script>

<style></style>
