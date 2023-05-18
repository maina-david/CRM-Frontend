<template>
  <div>
    <div class="flex justify-between border-b mt-10 m-5">
      <div class="m-3"><DateRangePicker v-model="date" /></div>
      <div class="m-4">
        <ActionButton text="Export"></ActionButton>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-3">
      <div class="col-span-2 bg-white p-2">
        <HelpDeskResolutionRateTable
          :tableHead="helpDeskResolutionTableHead"
          :tableData="helpDeskResolutionTableData"
        />
      </div>
      <div class="col-span-2 bg-white p-2">
        <AgentResolutionReportTable
          :tableHead="agentResolutionTableHead"
          :tableData="agentResolutionTableData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import DateRangePicker from "@/components/DateRangePicker.vue";
import ActionButton from "@/components/ActionButton.vue";
import HelpDeskResolutionRateTable from "@/components/tables/CaseManagementTables/HelpDeskResolutionRateTable.vue";
import AgentResolutionReportTable from "@/components/tables/CaseManagementTables/AgentResolutionReportTable.vue";

export default {
  data() {
    return {
      start: "",
      end: "",
      date: "",
      helpDeskResolutionTableHead: [
        "Help Desk",
        "Total Tickets",
        "Resolved Tickets",
        "Escalated Tickets",
        "Resolution Rate",
      ],
      helpDeskResolutionTableData: [
        {
          helpDesk: "First Help Desk",
          totalTickets: "785",
          resolvedTickets: "453",
          escalatedTickets: "332",
          resolutionRate: "23%",
        },
      ],
      agentResolutionTableHead: [
        "Agent",
        "Total Tickets",
        "Resolved Tickets",
        "Escalated Tickets",
        "Resolution Rate",
      ],
      agentResolutionTableData: [
        {
          agent: "Jane Doe",
          totalTickets: "785",
          resolvedTickets: "453",
          escalatedTickets: "332",
          resolutionRate: "23%",
        },
        {
          agent: "Doe John",
          totalTickets: "715",
          resolvedTickets: "433",
          escalatedTickets: "132",
          resolutionRate: "63%",
        },
        {
          agent: "Jane Doe",
          totalTickets: "785",
          resolvedTickets: "453",
          escalatedTickets: "332",
          resolutionRate: "23%",
        },
        {
          agent: "Doe John",
          totalTickets: "715",
          resolvedTickets: "433",
          escalatedTickets: "132",
          resolutionRate: "63%",
        },
      ],
    };
  },
  components: {
    DateRangePicker,
    ActionButton,
    HelpDeskResolutionRateTable,
    AgentResolutionReportTable,
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
    this.getCdrReport({
      start: this.start,
      end: this.end,
    });
  },
  watch: {
    date: function (val) {
      console.log("changed date", val);
      if (!val.start || !val.end) {
        console.log("No Date");
      } else {
        this.getCdrReport({
          start: val.start,
          end: val.end,
        });
      }
    },
  },
  methods: { ...mapActions(["getCdrReport"]) },
  computed: {
    ...mapGetters(["cdrReport"]),
  },
};
</script>

<style></style>
