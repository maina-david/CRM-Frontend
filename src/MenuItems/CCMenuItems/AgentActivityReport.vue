<template>
  <div class="m-10">
    <div class="flex justify-between border-b pb-2">
      <div class="flex gap-5">
        <div
          class="text-md font-medium text-center mt-5 text-gray-600 dark:text-gray-400 dark:border-gray-700"
        >
          Select Period to Populate Report:
        </div>
        <div class="m-3"><DateRangePicker v-model="date" /></div>
      </div>

      <div class="m-4"><ActionButton text="Export" /></div>
    </div>

    <div class="mt-10" v-if="showreport === true">
      <div
        v-for="(value, key) in agentActivityReport.agent_activity"
        :key="key"
        class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
      >
        <AgentActivityReportTable
          :tableHead="agentActivityTableHead"
          :tableData="value"
          :date="key"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import DateRangePicker from "@/components/DateRangePicker.vue";
import AgentActivityReportTable from "@/components/tables/ContactCenterTables/AgentActivityReportTable.vue";
//import DatePick from "@/components/DatePick.vue";
//import Dropdown from "@/components/Dropdown.vue";
import ActionButton from "@/components/ActionButton.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  watch: {
    date() {
      this.showreport = false;
      this.getAgentActivityReport(this.date);
      this.showreport = true;
    },
  },
  computed: {
    ...mapGetters(["agentActivityReport"]),
  },
  methods: {
    ...mapActions(["getAgentActivityReport"]),
  },
  components: { AgentActivityReportTable, DateRangePicker, ActionButton },
  data() {
    return {
      state: "",
      showreport: false,
      currentAccountForm: "",
      agentActivityTableHead: [
        "Name",
        "Queues",
        "Online Time",
        "Break Time",
        "Penalty",
      ],
      agentActivityTableData: [
        {
          date: "23rd October 2022",
          data: [
            {
              name: "Jane Doe",
              queues: ["Queue 1"],
              online_time: "34 minutes",
              break_time: "0",
              penalty: 0,
            },
            {
              name: "Emmaculate Doe",
              queues: ["Queue 1", "Agent Queue"],
              online_time: "13 minutes",
              break_time: "20 minutes",
              penalty: 5,
            },
            {
              name: "John Doe",
              queues: ["Queue 1"],
              online_time: "10 minutes",
              break_time: "36 minutes",
              penalty: 3,
            },
            {
              name: "Lewis Doe",
              queues: ["Queue 1", "Agent Queue"],
              online_time: "13 minutes",
              break_time: "20 minutes",
              penalty: 5,
            },
          ],
        },
        {
          date: "25rd October 2022",
          data: [
            {
              name: "Jane Doe",
              queues: ["Queue 1"],
              online_time: "10 minutes",
              break_time: "36 minutes",
              penalty: 3,
            },
            {
              name: "Emmaculate Doe",
              queues: ["Queue 1", "Agent Queue"],
              online_time: "13 minutes",
              break_time: "20 minutes",
              penalty: 5,
            },
            {
              name: "John Doe",
              queues: ["Queue 1"],
              online_time: "34 minutes",
              break_time: "0",
              penalty: 0,
            },
            {
              name: "Lewis Doe",
              queues: ["Queue 1", "Agent Queue"],
              online_time: "13 minutes",
              break_time: "20 minutes",
              penalty: 5,
            },
          ],
        },
        {
          date: "30th October 2022",
          data: [
            {
              name: "Jane Doe",
              queues: ["Queue 1"],
              online_time: "10 minutes",
              break_time: "36 minutes",
              penalty: 3,
            },
            {
              name: "Emmaculate Doe",
              queues: ["Queue 1", "Agent Queue"],
              online_time: "13 minutes",
              break_time: "20 minutes",
              penalty: 5,
            },
            {
              name: "John Doe",
              queues: ["Queue 1"],
              online_time: "34 minutes",
              break_time: "0",
              penalty: 0,
            },
            {
              name: "Lewis Doe",
              queues: ["Queue 1", "Agent Queue"],
              online_time: "13 minutes",
              break_time: "20 minutes",
              penalty: 5,
            },
          ],
        },
      ],
      date: "",
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
      period: "",
    };
  },
  setup() {
    const showCreateFormModal = ref(false);

    return {
      showCreateFormModal,
    };
  },
};
</script>

<style></style>
