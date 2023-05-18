<template>
  <div class="flex border-b">
    <div>
      <h2 class="text-lg font-semibold py-2">Help Desk Data Analytics</h2>
    </div>
  </div>
  <div class="grid grid-cols-3 gap-5">
    <div class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden" s>
      <div>
        <div class="p-2 border-b">
          <h2 class="text-sm font-normal">Total Number of Tickets</h2>
        </div>
        <PieChart
          :chartData="ticketsPerHelpDeskDailyTotalChartData"
          v-if="
            this.ticketsPerHelpDeskDailyTotalChartData.datasets[0].data
              ?.length > 0
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
          <h2 class="text-sm font-normal">Total Resolved Tickets</h2>
        </div>
        <PieChart
          :chartData="ticketsPerHelpDeskDailyDailyResolvedChartData"
          v-if="
            this.ticketsPerHelpDeskDailyDailyResolvedChartData.datasets[0].data
              ?.length > 0
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
          <h2 class="text-sm font-normal">Total Escalated Tickets</h2>
        </div>
        <PieChart
          :chartData="ticketsPerHelpDeskDailyDailyEscalatedChartData"
          v-if="
            this.ticketsPerHelpDeskDailyDailyEscalatedChartData.datasets[0].data
              ?.length > 0
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
      <HelpDeskSLATable
        :tableHead="helpDeskSLATableHead"
        :tableData="helpDeskResolutionTableData"
      />
    </div>
    <div class="col-span-2">
      <HelpDeskResolutionRateCard />
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Graphics/PieChart";
import HelpDeskResolutionRateCard from "@/components/cards/CaseManagementCards/HelpDeskResolutionRateCard.vue";
import HelpDeskSLATable from "@/components/tables/CaseManagementTables/HelpDeskSLATable.vue";

export default {
  data() {
    return {
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
      ticketsPerHelpDeskDailyTotalChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [
          "Help Desk 1",
          "Help Desk 2",
          "Help Desk 3",
          "Help Desk 4",
          "Help Desk 5",
          "Help Desk 6",
          "Help Desk 7",
          "Help Desk 8",
          "Help Desk 9",
        ],
        datasets: [
          {
            label: "TOTAL TICKETS",
            backgroundColor: this.getRandomColorEachSection(
              [345, 135, 210, 45, 35, 21, 645, 135, 210].length
            ),
            data: [345, 135, 210, 45, 35, 21, 645, 135, 210],
          },
        ],
      },
      ticketsPerHelpDeskDailyDailyResolvedChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [
          "Help Desk 1",
          "Help Desk 2",
          "Help Desk 3",
          "Help Desk 4",
          "Help Desk 5",
          "Help Desk 6",
          "Help Desk 7",
          "Help Desk 8",
          "Help Desk 9",
        ],
        datasets: [
          {
            label: "ESCALATED TICKETS",
            backgroundColor: this.getRandomColorEachSection(
              [95, 365, 146, 195, 365, 16, 95, 65, 146].length
            ),
            data: [95, 365, 146, 195, 365, 16, 95, 65, 146],
          },
        ],
      },
      ticketsPerHelpDeskDailyDailyEscalatedChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [
          "Help Desk 1",
          "Help Desk 2",
          "Help Desk 3",
          "Help Desk 4",
          "Help Desk 5",
          "Help Desk 6",
          "Help Desk 7",
          "Help Desk 8",
          "Help Desk 9",
        ],
        datasets: [
          {
            label: "RESOLVED TICKETS",
            backgroundColor: this.getRandomColorEachSection(
              [345, 135, 210, 45, 35, 21, 645, 135, 210].length
            ),
            data: [345, 135, 210, 45, 35, 21, 645, 135, 210],
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
    HelpDeskResolutionRateCard,
    HelpDeskSLATable,
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
};
</script>

<style></style>
