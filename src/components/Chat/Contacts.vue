<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div>
      <div class="min-w-0 my-2 border-b border-slate-200">
        <a href="#" class="focus:outline-none">
          <div class="flex items-center justify-between">
            <div>
              <p
                class="text-xs font-bold text-slate-800 overflow-hidden"
                style="width: 120px"
              >
                {{ accountChats.customer_name }}
              </p>
            </div>
            <div class="text-gray-400 text-xs ml-8">
              {{ formatDate(accountChats.created_at) }}
            </div>
          </div>
          <div class="flex items-center justify-between my-1">
            <div></div>
            <div>
              <div v-if="accountChats.status == 'CLOSED'">
                <p class="text-xs text-red-700 bg-red-100 p-1 truncate">
                  {{ accountChats.status }}
                </p>
              </div>
              <div v-if="accountChats.status == 'ON-GOING'">
                <p class="text-xs text-green-700 bg-green-100 p-1 truncate">
                  {{ accountChats.status }}
                </p>
              </div>
              <div v-if="accountChats.status == 'ON-BOT'">
                <p class="text-xs text-orange-700 bg-orange-100 p-1 truncate">
                  {{ accountChats.status }}
                </p>
              </div>
            </div>
            <div
              v-if="accountChats.unread_messages !== 0"
              class="text-white text-xs bg-lime-500 rounded-full px-2 py-1"
            >
              {{ accountChats.unread_messages }}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import moment from "moment";
import WhatsAppIcon from "@/assets/icons8-whatsapp.svg";
import FacebookIcon from "@/assets/icons8-facebook-circled.svg";
import InstagramIcon from "@/assets/icons8-instagram.svg";
import TwitterIcon from "@/assets/icons8-twitter.svg";

export default {
  props: {
    accountChats: { type: Object },
  },
  components: {},

  data() {
    return {
      message: "",
      conversation: "",
      WhatsAppIcon: WhatsAppIcon,
      FacebookIcon: FacebookIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon,
    };
  },
  created() {
    this.connect();
  },
  watch: {
    conversation: function (val) {
      console.log("conversation has changed", val);
      this.getAssignedConversations();
      this.getChannelConversations({
        channel_id: val.channel_id,
      });
    },
    message: function (val) {
      console.log("message has changed", val);
    },
  },
  methods: {
    ...mapActions(["getChannelConversations", "getAssignedConversations"]),
    formatDate(date) {
      return moment(date).calendar();
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
<style></style>
