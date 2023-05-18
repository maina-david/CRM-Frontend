<template>
  <main>
    <div class="mt-10 ml-12">
      <div class="flex justify-between m-5 border-b">
        <div>
          <div class="flex">
            <h2 class="text-sm font-semibold text-gray-700">
              {{ greeting }} 👋
            </h2>
          </div>
          <h4 class="text-md text-gray-700 font-medium mt-2 mb-2">
            {{ name }}
          </h4>
        </div>
        <div></div>
      </div>
      <div class="grid grid-cols-4 gap-5 m-5">
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <DashboardDataCard
            nameOfData="Total Number of Tickets"
            icon="confirmation_number"
            numberOfData="456"
            percentageIncrease="78"
          />
        </div>
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <DashboardDataCard
            nameOfData="Resolution Rate"
            icon="verified_user"
            numberOfData="45%"
            percentageIncrease="8"
          />
        </div>
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <DashboardDataCard
            nameOfData="Overdue Tickets"
            icon="warning"
            numberOfData="100"
            percentageIncrease="8"
          />
        </div>
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <DashboardDataCard
            nameOfData="Tickets within SLA"
            icon="thumb_up_alt"
            numberOfData="356"
            percentageIncrease="-68"
          />
        </div>
      </div>
    </div>
    <div class="m-14">
      <CaseManagementAgentAnalytics />
    </div>
    <div class="m-14">
      <HelpDeskAnalytics />
    </div>
  </main>
</template>

<script>
import DashboardDataCard from "@/components/cards/ContactCenterCards/DashboardCards/DashboardDataCard.vue";
import CaseManagementAgentAnalytics from "../../DashBoardViews/CaseManagementAgentAnalytics.vue";
import HelpDeskAnalytics from "../../DashBoardViews/HelpDeskAnalytics.vue";

export default {
  watch: {
    totalCallInProgress() {
      console.log(
        "These are the rotal calls in progress",
        this.totalCallInProgress
      );
      this.dashboardData = this.totalCallInProgress;
    },
  },
  name: "AdminDashboard",
  components: {
    DashboardDataCard,
    CaseManagementAgentAnalytics,
    HelpDeskAnalytics,
  },
  data() {
    return {
      greeting: "Hi,",
      name: "",
      dashboardData: {},
    };
  },
  created() {
    this.getGreeting();
    this.name = localStorage.getItem("username");
    this.extension = localStorage.getItem("sip_id");
  },
  updated() {
    this.getGreeting();
  },
  computed: {},
  methods: {
    getGreeting() {
      var hour = new Date().getHours();
      if (hour < 12) {
        this.greeting = "Good Morning ";
      } else if (hour >= 12 && hour < 18) {
        this.greeting = "Good Afternoon ";
      } else if (hour >= 18 && hour < 21) {
        this.greeting = "Good Evening ";
      } else {
        this.greeting = "Hi,";
      }
    },
  },
};
</script>

<style></style>
