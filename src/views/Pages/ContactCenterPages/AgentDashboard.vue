<template>
  <main>
    <div class="mt-10 ml-12">
      <div class="flex justify-between m-3 border-b">
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
        <div class="flex align-center gap-2">
          <div>
            <div v-if="status == 'PAUSED'">
              <ActionButton @click="resumeBreak" text="Resume Session" />
            </div>
            <div v-else>
              <ActionButton
                text="Take Break"
                @click="showTakeBreakModal = !showTakeBreakModal"
              />
            </div>
          </div>

          <div class="bg-slate-200 p-3 mb-2">
            <h2 v-if="status == 'PAUSED'" class="text-sm font-bold mb-2">
              <span class="material-icons text-sm align-middle mr-2"
                >pause</span
              >
              ON BREAK
            </h2>
            <h2 class="text-xs font-bold">
              <span class="material-icons text-sm align-middle mr-2">call</span>
              Extension No: {{ extension }}
            </h2>
            <h2 class="text-xs font-bold">
              <span
                v-if="sipStatus == 'ONLINE'"
                class="material-icons text-sm align-middle mr-2"
              >
                signal_cellular_alt
              </span>
              <span
                v-if="sipStatus == 'OFFLINE'"
                class="material-icons text-sm align-middle mr-2"
              >
                signal_cellular_connected_no_internet_4_bar
              </span>
              <span
                v-if="sipStatus == 'DELAYED'"
                class="material-icons text-sm align-middle mr-2"
              >
                signal_cellular_nodata
              </span>
              Sip Status: {{ agent_sip }}
            </h2>
            <h2 class="text-xs font-bold">
              <span class="material-icons text-sm align-middle mr-2"
                >priority_high</span
              >
              Penalties: {{ penalty }}
            </h2>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-5 m-3">
        <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
          <DashboardDataCard
            nameOfData="Total Number of Calls"
            icon="phone_in_talk"
            :numberOfData="dashboardData.total_calls"
            :percentageIncrease="getCallsPercentage(dashboardData.total_calls)"
          />
        </div>
        <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
          <DashboardDataCard
            nameOfData="Answered Calls"
            icon="call"
            :numberOfData="dashboardData.answered"
            :percentageIncrease="getCallsPercentage(dashboardData.answered)"
          />
        </div>
        <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
          <MissedCallcard
            nameOfData="Abandoned Calls"
            icon="phone_missed"
            :penalty="penalty"
            :numberOfData="dashboardData.abandoned"
            :percentageIncrease="getCallsPercentage(dashboardData.abandoned)"
          />
        </div>
      </div>
      <div class="bg-white mt-5 p-3 mb-2 shadow-sm overflow-hidden">
        <div class="border-b">
          <h2 class="mt-2 font-semibold text-md p-3">
            Agent Call Status per queue
          </h2>
        </div>
        <div id="tabs" class="container">
          <div class="tabs">
            <a
              v-for="queue in agentQueueDailyMenuItems"
              :key="queue"
              v-on:click="activetab = queue"
              v-bind:class="[activetab == queue ? 'active' : '']"
              >{{ queue }}</a
            >
          </div>

          <div class="content">
            <div v-for="queue in agentQueueDaily" :key="queue.queue_name">
              <div v-if="activetab == queue.queue_name" class="tabcontent">
                <div class="flex grid-cols-3 gap-6">
                  <div class="m-5 col-span-1 mt-20">
                    <ProgressCircle
                      diameter="250"
                      :completed-steps="queue.ANSWERED"
                      :total-steps="queue.total_call"
                      circle-color="#f1f5f9"
                      circle-width="20"
                      start-color="#1e293b"
                      stop-color="#64748b"
                      inner-display="percent"
                      percent-color="#1e293b"
                    >
                    </ProgressCircle>
                    <p class="mt-5 text-gray-700 font-normal text-center">
                      {{ queue.queue_name }}
                    </p>
                    <div class="text-sm text-gray-600 mt-5 text-center">
                      ( Ring represents Complete : Total call ratio )
                    </div>
                    <div></div>
                  </div>
                  <div class="col-span-2 w-full mx-20">
                    <div>
                      <p class="mt-10 text-gray-700 border-b p-2">
                        Call Count Details
                      </p>
                      <div class="my-10">
                        <ProgressBar
                          label="Total Calls"
                          :percentage_progress="
                            (queue.total_call / queue.total_call).toFixed(2) *
                              100 +
                            '%'
                          "
                        />
                      </div>
                      <div class="my-10">
                        <ProgressBar
                          label="Answered Calls"
                          :percentage_progress="
                            (queue.ANSWERED / queue.total_call).toFixed(2) *
                              100 +
                            '%'
                          "
                        />
                      </div>
                      <div class="my-10">
                        <ProgressBar
                          label="Abandoned Calls"
                          :percentage_progress="
                            (queue.ABANDONED / queue.total_call).toFixed(2) *
                              100 +
                            '%'
                          "
                        />
                      </div>
                    </div>
                    <div>
                      <p class="mt-10 mb-5 border-b text-gray-700 p-2">
                        Call Time Details
                      </p>
                      <Timeline :timelines="queue" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TakeBreakModal :show="showTakeBreakModal" />
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import DashboardDataCard from "@/components/cards/ContactCenterCards/DashboardCards/DashboardDataCard.vue";
import MissedCallcard from "@/components/cards/ContactCenterCards/DashboardCards/MissedCallcard.vue";
import ActionButton from "@/components/ActionButton.vue";
import TakeBreakModal from "@/components/modals/ContactCenterModals/TakeBreakModal.vue";
import { ProgressCircle } from "vue-progress-circle";
import ProgressBar from "@/components/progressBars/progressBar.vue";
import Timeline from "@/components/timeline/timeline.vue";

export default {
  watch: {
    agentProgressDaily() {
      this.dashboardData = this.agentProgressDaily;
    },
    previousState() {
      this.agent_sip = this.previousState;
    },
    state(val) {
      console.log("this is the current state", val);
    },
  },
  name: "AgentDashboard",
  el: "#tabs",
  data() {
    return {
      greeting: "Hi,",
      dashboardData: {},
      name: "",
      extension: "",
      activetab: "",
      agent_sip: "",
    };
  },
  methods: {
    ...mapActions([
      "getAgentProgressDaily",
      "getAgentQueueDaily",
      "getAgentStatus",
      "resumeFromBreak",
    ]),
    connect() {
      var userId = localStorage.getItem("userid");
      window.Echo.channel(userId).listen(".agent_current_call", (e) => {
        console.log("i am here");
        console.log(e);
        this.dashboardData = e;
        this.getAgentQueueDaily();
      });
    },
    getCallsPercentage(call) {
      return (call / this.dashboardData.total_calls).toFixed(2) * 100 || 0;
    },
    getGreeting() {
      var hour = new Date().getHours();
      if (hour < 12) {
        this.greeting = "Good Morning, ";
      } else if (hour >= 12 && hour < 18) {
        this.greeting = "Good Afternoon, ";
      } else if (hour >= 18 && hour < 21) {
        this.greeting = "Good Evening,";
      } else {
        this.greeting = "Hi,";
      }
    },
    resumeBreak() {
      console.log("resume from break will be here");
      this.resumeFromBreak();
      this.getAgentStatus();
    },
  },
  setup() {
    const showTakeBreakModal = ref(false);

    return {
      showTakeBreakModal,
    };
  },
  components: {
    DashboardDataCard,
    MissedCallcard,
    ActionButton,
    TakeBreakModal,
    ProgressCircle,
    ProgressBar,
    Timeline,
  },
  created() {
    this.connect();

    this.getGreeting();
    this.name = localStorage.getItem("username");
    this.extension = localStorage.getItem("sip_id");
    this.getAgentStatus();
    this.getAgentProgressDaily();
    this.getAgentQueueDaily();
    this.activetab = this.agentQueueDailyMenuItems[0];
  },
  updated() {
    this.getGreeting();
  },
  computed: {
    ...mapGetters([
      "agentProgressDaily",
      "agentQueueDaily",
      "agentQueueDailyMenuItems",
      "sipStatus",
      "status",
      "penalty",
      "previousState",
    ]),
  },
};
</script>
<style scoped>
.tab-btn {
  padding: 6px 10px;
  background: #ffffff;
  cursor: pointer;
  margin-bottom: 1rem;
  border: 2px solid #cccccc;
  outline: none;
}
.selected {
  border-bottom: 3px solid #84cc16;
}

/* RESET */

.container {
  max-width: 100%;
  min-width: 50%;
  margin: 40px auto;
  font-size: 0.9em;
  color: #888;
}

/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-bottom: -2px; /* hide bottom border */
  margin-left: 24px;
}

.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  border: 1px solid #ccc;
  border-right: none;
  background-color: #f1f1f1;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.tabs a:last-child {
  border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: #aaa;
  color: #fff;
}

/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  color: #484848;
  border-bottom: 2px solid #fff;
  cursor: default;
}

/* Style the tab content */
.tabcontent {
  padding: 30px 50px;
  border-top: 1px solid #ccc;
  border-radius: 2px;
}

.tabcontent td {
  padding: 0.3em 0.4em;
  color: #484848;
}
.tabcontent td.legend {
  color: #888;
  font-weight: bold;
  text-align: right;
}
.tabcontent .map {
  height: 173px;
  width: 220px;
  background: #d3eafb;
  margin-left: 60px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.data {
  width: 120px;
}
</style>
