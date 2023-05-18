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
        <HelpDeskSLATable
          :tableHead="helpDeskSLATableHead"
          :tableData="helpDeskResolutionTableData"
        />
      </div>
      <div class="col-span-2 bg-white p-2">
        <AgentSLATable
          :tableHead="agentSLATableHead"
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
import HelpDeskSLATable from "@/components/tables/CaseManagementTables/HelpDeskSLATable.vue";
import AgentSLATable from "@/components/tables/CaseManagementTables/AgentSLATable.vue";

export default {
  data() {
    return {
      start: "",
      end: "",
      date: "",
      helpDeskSLATableHead: [
        "Help Desk",
        "Total Tickets",
        "Average Resolution Time",
        "Tickets Within SLA",
        "Overdue Tickets",
      ],
      helpDeskResolutionTableData: [
        {
          helpDesk: "Help Desk 1",
          totalTickets: "154",
          resolutionTime: "23",
          withinSLA: "85%",
          overdue: "15%",
        },
        {
          helpDesk: "Help Desk 2",
          totalTickets: "154",
          resolutionTime: "23",
          withinSLA: "85%",
          overdue: "15%",
        },
        {
          helpDesk: "Help Desk 3",
          totalTickets: "154",
          resolutionTime: "23",
          withinSLA: "85%",
          overdue: "15%",
        },
        {
          helpDesk: "Help Desk 4",
          totalTickets: "154",
          resolutionTime: "23",
          withinSLA: "85%",
          overdue: "15%",
        },
      ],
      agentSLATableHead: [
        "Agent",
        "Total Tickets",
        "Resolution Time",
        "Tickets Within SLA",
        "Overdue Tickets",
      ],
      agentResolutionTableData: [
        {
          agent: "Agent 1",
          totalTickets: "154",
          resolutionTime: "23",
          withinSLA: "15%",
          overdue: "9%",
        },
      ],
    };
  },
  components: {
    DateRangePicker,
    ActionButton,
    HelpDeskSLATable,
    AgentSLATable,
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
