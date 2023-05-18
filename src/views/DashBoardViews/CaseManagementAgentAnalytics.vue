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
          <h2 class="text-sm font-normal">Total Number of Tickets</h2>
        </div>
        <PieChart
          :chartData="ticketsPerAgentDailyTotalChartData"
          v-if="
            this.ticketsPerAgentDailyTotalChartData.datasets[0].data?.length > 0
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
          :chartData="ticketsPerAgentDailyResolvedChartData"
          v-if="
            this.ticketsPerAgentDailyResolvedChartData.datasets[0].data
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
          :chartData="ticketsPerAgentDailyEscalatedChartData"
          v-if="
            this.ticketsPerAgentDailyEscalatedChartData.datasets[0].data
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
      <AgentSLATable
        :tableHead="agentSLATableHead"
        :tableData="agentResolutionTableData"
      />
    </div>
    <div class="col-span-2">
      <ResolutionRateCard />
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Graphics/PieChart";
import ResolutionRateCard from "@/components/cards/CaseManagementCards/ResolutionRateCard.vue";
import AgentSLATable from "@/components/tables/CaseManagementTables/AgentSLATable.vue";

export default {
  data() {
    return {
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
        {
          agent: "Agent 2",
          totalTickets: "134",
          resolutionTime: "13",
          withinSLA: "15%",
          overdue: "9%",
        },
        {
          agent: "Agent 3",
          totalTickets: "789",
          resolutionTime: "23",
          withinSLA: "46%",
          overdue: "13%",
        },
        {
          agent: "Agent 4",
          totalTickets: "894",
          resolutionTime: "93",
          withinSLA: "80%",
          overdue: "12%",
        },
        {
          agent: "Agent 5 ",
          totalTickets: "154",
          resolutionTime: "23",
          withinSLA: "11%",
          overdue: "90%",
        },
        {
          agent: "Agent 6",
          totalTickets: "9634",
          resolutionTime: "2",
          withinSLA: "0%",
          overdue: "100%",
        },
        {
          agent: "Agent 7",
          totalTickets: "494",
          resolutionTime: "23",
          withinSLA: "65%",
          overdue: "8%",
        },
      ],
      ticketsPerAgentDailyTotalChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [
          "Agent 1",
          "Agent 2",
          "Agent 3",
          "Agent 4",
          "Agent 5",
          "Agent 6",
          "Agent 7",
          "Agent 8",
          "Agent 9",
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
      ticketsPerAgentDailyResolvedChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [
          "Agent 1",
          "Agent 2",
          "Agent 3",
          "Agent 4",
          "Agent 5",
          "Agent 6",
          "Agent 7",
          "Agent 8",
          "Agent 9",
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
      ticketsPerAgentDailyEscalatedChartData: {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: [
          "Agent 1",
          "Agent 2",
          "Agent 3",
          "Agent 4",
          "Agent 5",
          "Agent 6",
          "Agent 7",
          "Agent 8",
          "Agent 9",
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
    ResolutionRateCard,
    AgentSLATable,
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
