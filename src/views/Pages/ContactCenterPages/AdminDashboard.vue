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
            nameOfData="Total Number of Calls"
            icon="phone_in_talk"
            :numberOfData="dashboardData.total_calls"
            :percentageIncrease="getCallsPercentage(dashboardData.total_calls)"
          />
        </div>
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <DashboardDataCard
            nameOfData="Calls in IVR"
            icon="smartphone"
            :numberOfData="dashboardData.calls_in_ivr"
            :percentageIncrease="getCallsPercentage(dashboardData.calls_in_ivr)"
          />
        </div>
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <DashboardDataCard
            nameOfData="Calls in Queue"
            icon="groups"
            :numberOfData="dashboardData.calls_in_queue"
            :percentageIncrease="
              getCallsPercentage(dashboardData.calls_in_queue)
            "
          />
        </div>
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <DashboardDataCard
            nameOfData="Calls in progress"
            :numberOfData="dashboardData.call_in_progress"
            icon="call"
            :percentageIncrease="
              getCallsPercentage(dashboardData.call_in_progress)
            "
          />
        </div>
      </div>
      <div class="m-10">
        <QueueAnalytics />
      </div>
      <div class="m-10">
        <AgentDataAnalytics />
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DashboardDataCard from "@/components/cards/ContactCenterCards/DashboardCards/DashboardDataCard.vue";
import QueueAnalytics from "../../DashBoardViews/QueueAnalytics.vue";
import AgentDataAnalytics from "../../DashBoardViews/AgentDataAnalytics.vue";

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
    QueueAnalytics,
    AgentDataAnalytics,
  },
  data() {
    return {
      greeting: "Hi,",
      name: "",
      dashboardData: {},
    };
  },
  created() {
    this.connect();
    this.getGreeting();
    this.name = localStorage.getItem("username");
    this.extension = localStorage.getItem("sip_id");
    this.getTotalCallsInProgress();
  },
  updated() {
    this.getGreeting();
  },
  computed: {
    ...mapGetters(["totalCallInProgress"]),
  },
  methods: {
    ...mapActions(["getTotalCallsInProgress"]),
    connect() {
      var userId = localStorage.getItem("userid");
      window.Echo.channel(userId).listen(".admin_current_call", (e) => {
        console.log("i am here");
        console.log(e);
        this.dashboardData = e;
      });
    },
    getCallsPercentage(call) {
      return (call / this.dashboardData.total_calls) * 100 || 0;
    },
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
