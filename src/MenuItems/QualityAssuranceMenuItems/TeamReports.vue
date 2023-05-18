<template>
  <div class="flex justify-between border-b mt-10">
    <div class="flex gap-5">
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
  <div class="w-full mt-10">
    <div class="bg-white rounded-sm shadow-sm p-4 col-span-3">
      <TeamReportTable
        :tableHead="teamReportTableHead"
        :tableData="teamReportTableData"
      />
    </div>
    <div class="bg-white rounded-sm shadow-sm p-4 mt-5">
      <QATeamReportTable
        :tableHead="reviewerReportTableHead"
        :tableData="reviewerReportTableData"
      />
    </div>
  </div>
</template>

<script>
import QATeamReportTable from "@/components/tables/QAManagementTables/QATeamReportTable.vue";
import TeamReportTable from "@/components/tables/QAManagementTables/TeamReportTable.vue";
import moment from "moment";
import DatePick from "@/components/DatePick.vue";
import ActionButton from "@/components/ActionButton.vue";
import Dropdown from "@/components/Dropdown.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Team Reports",
  data() {
    return {
      teamReportTableHead: [
        "Team Name",
        "Total Score",
        "Reviews Done",
        "Total No. of Agents",
        "No. of Agents Reviewed",
        "Average Handling Time(AHT)",
      ],
      teamReportTableData: [
        {
          name: "Jane the Reviewer",
          total_score: 25,
          avg_score: 12,
          reviews_done: "45",
          total_agents: "5",
          agents_reviewed: "22",
          aht: "10 minutes",
        },
        {
          name: "John the Reviewer",
          total_score: 25,
          avg_score: 12,
          reviews_done: "45",
          total_agents: "5",
          agents_reviewed: "22",
          aht: "10 minutes",
        },
      ],
      reviewerReportTableHead: [
        "Reviewer's Name",
        "Reviews Done",
        "Pending Reviews",
        "No. of Agents Reviewed",
        "Average Total Score",
        "Average Handling Time(AHT)",
        "action",
      ],
      reviewerReportTableData: [
        {
          name: "Jane the Reviewer",
          reviews_done: "45",
          pending_reviews: "5",
          agents_reviewed: "22",
          avg_total_score: 25,
          aht: "10 minutes",
        },
        {
          name: "John the Reviewer",
          reviews_done: "15",
          pending_reviews: "5",
          agents_reviewed: "5",
          avg_total_score: 5,
          aht: "7 minutes",
        },
        {
          name: "Jane the Reviewer",
          reviews_done: "45",
          pending_reviews: "5",
          agents_reviewed: "22",
          avg_total_score: 25,
          aht: "10 minutes",
        },
        {
          name: "John the Reviewer",
          reviews_done: "15",
          pending_reviews: "5",
          agents_reviewed: "5",
          avg_total_score: 5,
          aht: "7 minutes",
        },
      ],
      date: "",
      timeFrames: [
        { label: "Daily", value: "day" },
        { label: "Weekly", value: "week" },
        { label: "Monthly", value: "month" },
        { label: "Annually", value: "year" },
      ],
      period: "",
    };
  },
  components: {
    QATeamReportTable,
    DatePick,
    ActionButton,
    Dropdown,
    TeamReportTable,
  },
  created() {
    this.date = moment(new Date().getTime() - 3600 * 1000 * 24 * 30).format(
      "yyyy-MM"
    );
    this.period = "month";
  },
};
</script>

<style></style>
