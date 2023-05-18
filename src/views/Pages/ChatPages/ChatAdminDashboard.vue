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
            nameOfData="Total Number of Conversations"
            icon="question_answer"
            :numberOfData="dashboardLiveData.all_conversations"
            percentageIncrease="78"
          />
        </div>
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <DashboardDataCard
            nameOfData="Closed Conversation"
            icon="sms"
            :numberOfData="dashboardLiveData.closed_conversations"
            percentageIncrease="8"
          />
        </div>
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <DashboardDataCard
            nameOfData="Open Conversations"
            icon="sms_failed"
            :numberOfData="dashboardLiveData.open_conversations"
            percentageIncrease="-8"
          />
        </div>
        <div
          class="col-span-1 bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden"
        >
          <DashboardDataCard
            nameOfData="Average Handling Time"
            icon="thumb_up_alt"
            :numberOfData="dashboardLiveData.average_handling_time"
            percentageIncrease="68"
          />
        </div>
      </div>
    </div>
    <div class="m-14">
      <ChatChannelAnalytics />
    </div>
    <div class="m-14">
      <ChatQueueAnalytics />
    </div>
    <div class="m-14">
      <ChatAgentAnalytics />
    </div>
  </main>
</template>

<script>
import DashboardDataCard from "@/components/cards/ContactCenterCards/DashboardCards/DashboardDataCard.vue";
import ChatChannelAnalytics from "../../DashBoardViews/ChatChannelAnalytics.vue";
import ChatQueueAnalytics from "../../DashBoardViews/ChatQueueAnalytics.vue";
import ChatAgentAnalytics from "../../DashBoardViews/ChatAgentAnalytics.vue";
import { mapActions, mapGetters } from "vuex";

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
    ChatChannelAnalytics,
    ChatQueueAnalytics,
    ChatAgentAnalytics,
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
    this.getDashboardLiveData();
    this.getConversationsPerChannel();
    this.getConversationsPerChannelOpen();
    this.getConversationsPerChannelClosed();
    this.getConversationsPerQueue();
    this.getConversationsPerQueueOpen();
    this.getConversationsPerQueueClosed();
    this.getConversationsPerAgent();
    this.getConversationsPerAgentOpen();
    this.getConversationsPerAgentClosed();
  },
  updated() {
    this.getGreeting();
  },
  computed: {
    ...mapGetters(["dashboardLiveData", "allConversationsPerChannel"]),
  },
  methods: {
    ...mapActions([
      "getDashboardLiveData",
      "getConversationsPerChannel",
      "getConversationsPerChannelClosed",
      "getConversationsPerChannelOpen",
      "getConversationsPerQueue",
      "getConversationsPerQueueOpen",
      "getConversationsPerQueueClosed",
      "getConversationsPerAgent",
      "getConversationsPerAgentOpen",
      "getConversationsPerAgentClosed",
    ]),
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
