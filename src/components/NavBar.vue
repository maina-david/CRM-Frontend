<template>
  <header class="text-sm sticky">
    <nav
      class="w-full py-3 bg-white fixed text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-sm navbar navbar-expand-lg navbar-light"
    >
      <div
        class="container flex justify-between flex-wrap items-center mx-auto"
      >
        <div>
          <router-link :to="{ name: 'HomePage' }" class="button">
            <div class="logo mx-4">
              <img :src="logoURL" alt="Vue" />
            </div>
          </router-link>
        </div>
        <!-- Right elements -->
        <div class="inline-flex gap-5 justify-center items-center">
          <!-- Icon -->
          <div>
            <ActionButton
              text="Call Agent"
              @click="agentsDrawerVisible = true"
              class="mr-6 toggle"
            />
          </div>
          <div>
            <ActionButton
              text="Agent Status "
              class="mr-6 toggle"
              @click="drawerVisible = true"
            />
          </div>
          <router-link :to="{ name: 'UserProfile' }" replace>
            <a
              class="text-gray-500 relative hover:text-gray-700 focus:text-gray-700 mr-6"
              href="#"
            >
              <span
                class="absolute w-3 h-3 bg-red-400 border-2 border-white dark:border-gray-800 rounded-full"
              ></span>
              <span class="material-icons">notifications</span>
            </a>
          </router-link>
          <router-link :to="{ name: 'UserProfile' }" replace>
            <a
              class="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-6"
            >
              <span class="material-icons">account_circle</span>
            </a>
          </router-link>
          <LogoutIcon class="mr-6 cursor-pointer" />
        </div>
      </div>

      <!--Agents Slider-->
      <div
        class="right-drawer"
        :style="{
          width: drawerVisible ? '60%' : '0',
          paddingLeft: drawerVisible ? '10px' : '0',
        }"
      >
        <div style="text-align: right; margin: 5px">
          <button class="close text-xs" @click="drawerVisible = false">
            &#9587;
          </button>
        </div>
        <AgentsSlide />
      </div>
      <!--Call Agents Slider-->

      <div
        class="right-drawer"
        :style="{
          width: agentsDrawerVisible ? '35%' : '0',
          paddingLeft: agentsDrawerVisible ? '10px' : '0',
        }"
      >
        <div style="text-align: right; margin: 5px">
          <button class="close text-xs" @click="agentsDrawerVisible = false">
            &#9587;
          </button>
        </div>
        <CallInternalAgents />
      </div>

      <!---Loader-->
      <transition name="fade" mode="out-in">
        <div
          v-if="showAlert"
          class="relative h-0 w-9/12 mx-auto top-8 drop-shadow-xl"
        >
          <div class="sticky inset-x-0 top-0">
            <Alert
              @click="closeAlert"
              :typeOfAlert="typeOfAlert"
              :message="alertMessage"
              :bulkMessage="alertBulkMessage"
              :head="alertTitle"
            />
          </div>
        </div>
      </transition>
      <!-- Right elements -->
    </nav>
    <Loader
      v-if="
        loading ||
        loadingInvites ||
        loadingSetup ||
        loadingGroup ||
        loadingCompany ||
        loadingRoleProfile ||
        loadingUsers ||
        loadingChannels ||
        loadingIvr ||
        loadingQueues ||
        loadingAgents ||
        loadingCalls ||
        loadingReports ||
        loadingNotifications ||
        loadingAccountForms ||
        loadingAccountTypes ||
        loadingContactForm ||
        loadingContact ||
        loadingAccount ||
        loadingMetaAccessToken ||
        loadingChatBot ||
        loadingChatQueue ||
        loadingHelpDeskTeam ||
        loadingTicket ||
        loadingChat ||
        loadingCampaign ||
        loadingConversation ||
        loadingQualityAssuranceForm ||
        loadingQualityAssuranceReviews ||
        loadingQualityAssuranceTeam
      "
    />
  </header>

  <router-view />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Alert from "@/components/alert/Alert.vue";
import Loader from "@/components/loaders/Loader.vue";
import LogoutIcon from "./LogoutIcon.vue";
import logoURL from "../assets/logo.svg";
import ActionButton from "./ActionButton.vue";
import AgentsSlide from "./AgentsSlide.vue";
import CallInternalAgents from "@/views/Pages/CallInternalAgents.vue";

export default {
  name: "NavBar",
  components: {
    Alert,
    Loader,
    LogoutIcon,
    ActionButton,
    AgentsSlide,
    CallInternalAgents,
  },
  data() {
    return {
      showAlert: false,
      typeOfAlert: "Info",
      alertTitle: "Alert",
      alertMessage: "",
      alertBulkMessage: "",
      logoURL: logoURL,
      drawerVisible: false,
      agentsDrawerVisible: false,
      message: "",
      conversation: "",
    };
  },
  computed: {
    ...mapGetters([
      "loading",
      "success",
      "error",
      "loadingInvites",
      "successInvites",
      "errorInvites",
      "errorInvitesBulk",
      "loadingSetup",
      "successSetup",
      "errorSetup",
      "loadingGroup",
      "successGroup",
      "errorGroup",
      "loadingCompany",
      "successCompany",
      "errorCompany",
      "loadingRoleProfile",
      "successRoleProfile",
      "errorRoleProfile",
      "loadingUsers",
      "successUsers",
      "errorUsers",
      "loadingChannels",
      "successChannels",
      "errorChannels",
      "loadingQueues",
      "successQueues",
      "errorQueues",
      "loadingIvr",
      "successIvr",
      "errorIvr",
      "loadingAgents",
      "successAgents",
      "errorAgents",
      "loadingCalls",
      "successCalls",
      "errorCalls",
      "loadingReports",
      "successReports",
      "errorReports",
      "loadingNotifications",
      "successNotifications",
      "errorNotifications",
      "loadingAccountForms",
      "successAccountForms",
      "errorAccountForms",
      "loadingAccountTypes",
      "successAccountTypes",
      "errorAccountTypes",
      "loadingContact",
      "successContact",
      "errorContact",
      "loadingContactForm",
      "successContactForm",
      "errorContactForm",
      "loadingAccount",
      "successAccount",
      "errorAccount",
      "loadingMetaAccessToken",
      "successMetaAccessToken",
      "errorMetaAccessToken",
      "loadingChatBot",
      "successChatBot",
      "errorChatBot",
      "loadingChatQueue",
      "successChatQueue",
      "errorChatQueue",
      "loadingHelpDeskTeam",
      "successHelpDeskTeam",
      "errorHelpDeskTeam",
      "loadingTicket",
      "successTicket",
      "errorTicket",
      "loadingChat",
      "successChat",
      "errorChat",
      "loadingCampaign",
      "successCampaign",
      "errorCampaign",
      "loadingConversation",
      "successConversation",
      "errorConversation",
      "loadingQualityAssuranceForm",
      "successQualityAssuranceForm",
      "errorQualityAssuranceForm",
      "loadingQualityAssuranceReviews",
      "successQualityAssuranceReviews",
      "errorQualityAssuranceReviews",
      "loadingQualityAssuranceTeam",
      "successQualityAssuranceTeam",
      "errorQualityAssuranceTeam",
      "transferCallSuccess",
      "transferCallError",
    ]),
  },
  watch: {
    conversation: function (val) {
      this.alertTitle =
        "New Conversation From " + val.conversation.customer_name;
      this.typeOfAlert = "Success";
      this.alertMessage = val.status;
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 5000);
      this.getAssignedConversations();
    },
    message: function (val) {
      this.alertTitle = "New Messaage from " + val.from;
      this.typeOfAlert = "Success";
      this.alertMessage = val.message;
      this.showAlert = true;
      setTimeout(() => (this.showAlert = false), 5000);
    },
    success: function (val) {
      if (val) {
        this.alertTitle = "Auth Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    error: function (val) {
      if (val) {
        this.alertTitle = "Authentication Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successInvites: function (val) {
      if (val) {
        this.alertTitle = "Invites Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorInvites: function (val) {
      if (val) {
        this.alertTitle = "Invites Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorInvitesBulk: function (val) {
      if (val) {
        this.alertTitle = "Bulk Invites Error";
        this.typeOfAlert = "Danger";
        this.alertBulkMessage = val.errors;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 10000);
      }
    },
    successSetup: function (val) {
      if (val) {
        this.alertTitle = "Setup Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorSetup: function (val) {
      if (val) {
        this.alertTitle = "Setup Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successGroup: function (val) {
      if (val) {
        this.alertTitle = "Group Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorGroup: function (val) {
      if (val) {
        this.alertTitle = "Group Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successCompany: function (val) {
      if (val) {
        this.alertTitle = "Company Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorCompany: function (val) {
      if (val) {
        this.alertTitle = "Company Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successRoleProfile: function (val) {
      if (val) {
        this.alertTitle = "Role Profile Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorRoleProfile: function (val) {
      if (val) {
        this.alertTitle = "Role Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successUsers: function (val) {
      if (val) {
        this.alertTitle = "Users Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorUsers: function (val) {
      if (val) {
        this.alertTitle = "Users Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successChannels: function (val) {
      if (val) {
        this.alertTitle = "Channels Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorChannels: function (val) {
      if (val) {
        this.alertTitle = "Channels Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successQueues: function (val) {
      if (val) {
        this.alertTitle = "Queues Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorQueues: function (val) {
      if (val) {
        this.alertTitle = "Queues Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successIvr: function (val) {
      if (val) {
        this.alertTitle = "IVR Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorIvr: function (val) {
      if (val) {
        this.alertTitle = "IVR Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successAgents: function (val) {
      if (val) {
        this.alertTitle = "Agents Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorAgents: function (val) {
      if (val) {
        this.alertTitle = "Agents Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successCalls: function (val) {
      if (val) {
        this.alertTitle = "Calls Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorCalls: function (val) {
      if (val) {
        this.alertTitle = "Calls Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successReports: function (val) {
      if (val) {
        this.alertTitle = "Reports Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorReports: function (val) {
      if (val) {
        this.alertTitle = "Reports Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successNotifications: function (val) {
      if (val) {
        this.alertTitle = "Notifications Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorNotifications: function (val) {
      if (val) {
        this.alertTitle = "Notifications Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successAccountForms: function (val) {
      if (val) {
        this.alertTitle = "Account Forms Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorAccountForms: function (val) {
      if (val) {
        this.alertTitle = "Account Forms Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successAccountTypes: function (val) {
      if (val) {
        this.alertTitle = "Account Type Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorAccountTypes: function (val) {
      if (val) {
        this.alertTitle = "Account Type Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successContactForm: function (val) {
      if (val) {
        this.alertTitle = "Contact Form Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorContactForm: function (val) {
      if (val) {
        this.alertTitle = "Contact Form Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successContact: function (val) {
      if (val) {
        this.alertTitle = "Contact Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorContact: function (val) {
      if (val) {
        this.alertTitle = "Contact Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successAccount: function (val) {
      if (val) {
        this.alertTitle = "Account Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorAccount: function (val) {
      if (val) {
        this.alertTitle = "Account Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successMetaAccessToken: function (val) {
      if (val) {
        this.alertTitle = "Meta Access Token Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorMetaAccessToken: function (val) {
      if (val) {
        this.alertTitle = "Meta Access Token Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successChatBot: function (val) {
      if (val) {
        this.alertTitle = "Chat Bot Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorChatBot: function (val) {
      if (val) {
        this.alertTitle = "Chat Bot Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successChatQueue: function (val) {
      if (val) {
        this.alertTitle = "Chat Queue Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorChatQueue: function (val) {
      if (val) {
        this.alertTitle = "Chat Queue Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successHelpDeskTeam: function (val) {
      if (val) {
        this.alertTitle = "Help Desk Team Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorHelpDeskTeam: function (val) {
      if (val) {
        this.alertTitle = "Help Desk Team Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successTicket: function (val) {
      if (val) {
        this.alertTitle = "Ticket Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorTicket: function (val) {
      if (val) {
        this.alertTitle = "Ticket Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successChat: function (val) {
      if (val) {
        this.alertTitle = "Chat Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorChat: function (val) {
      if (val) {
        this.alertTitle = "Chat Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successCampaign: function (val) {
      if (val) {
        this.alertTitle = "Campaign Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorCampaign: function (val) {
      if (val) {
        this.alertTitle = "Campaign Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successConversation: function (val) {
      if (val) {
        this.alertTitle = "Conversation Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorConversation: function (val) {
      if (val) {
        this.alertTitle = "Conversation Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successQualityAssuranceForm: function (val) {
      if (val) {
        this.alertTitle = "Quality Assurance Form Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorQualityAssuranceForm: function (val) {
      if (val) {
        this.alertTitle = "Quality Assurance Form Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },

    successQualityAssuranceReviews: function (val) {
      if (val) {
        this.alertTitle = "Quality Assurance Reviews Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorQualityAssuranceReviews: function (val) {
      if (val) {
        this.alertTitle = "Quality Assurance Reviews Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    successQualityAssuranceTeam: function (val) {
      if (val) {
        this.alertTitle = "Quality Assurance Team Action Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    errorQualityAssuranceTeam: function (val) {
      if (val) {
        this.alertTitle = "Quality Assurance Team Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },

    transferCallSuccess: function (val) {
      if (val) {
        this.alertTitle = "Transfer Call Success";
        this.typeOfAlert = "Success";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
    transferCallError: function (val) {
      if (val) {
        this.alertTitle = "Transfer Call Error";
        this.typeOfAlert = "Danger";
        this.alertMessage = val;
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    },
  },
  created() {
    this.connect();
    this.getAllSip();
  },
  methods: {
    ...mapActions(["getAssignedConversations", "getAllSip"]),
    closeAlert() {
      this.showAlert = false;
    },
    connect() {
      var userId = localStorage.getItem("userid");
      var conversation = "assigned.conversation." + userId;
      var event = "." + "assigned.conversation." + userId;
      window.Echo.channel(conversation).listen(event, (e) => {
        console.log("i am here for new conversation");
        console.log(e);
        this.conversation = e;
      });
      var conv = "new.conversation.message." + userId;
      var convIdEvent = "." + "new.conversation.message." + userId;
      window.Echo.channel(conv).listen(convIdEvent, (e) => {
        console.log("i am here for new message");
        console.log(e);
        this.message = e;
      });
    },
  },
};
</script>

<style scoped>
/* Enter Classes */
.fade-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}
.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-enter-active {
  transition: all 0.5s ease;
}

/* Leave classes */
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
.fade-leave-active {
  transition: all 0.5s ease;
}
img {
  width: 60px;
}
.toggle {
  cursor: pointer;
}
.close {
  background: white;
  border: 0;
  cursor: pointer;
  margin: 5px;
}
.right-drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 0; /* initially */
  overflow: hidden;
  height: 100vh;
  padding-left: 0; /* initially */
  border-left: 1px solid whitesmoke;
  background: white;
  z-index: 200;
  transition: all 0.2s;
}
</style>
