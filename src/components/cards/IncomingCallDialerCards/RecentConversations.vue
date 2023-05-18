<template>
  <div class="bg-slate-50 p-3">
    <div>
      <h3 class="text-sm font-semibold text-gray-700 my-3 text-left">
        Recent Conversations
      </h3>
    </div>
    <div class="grid grid-cols-6 gap-4">
      <div class="col-span-2">
        <div v-for="conversation in recentConversations" :key="conversation.id">
          <div class="p-2 text-xs my-2">
            <div class="flex justify-between">
              <h3 class="font-semibold">{{ conversation.queue }}</h3>

              <h3
                v-if="conversation.status == 'CLOSED'"
                class="p-0.5 bg-green-100 text-green-600"
              >
                {{ conversation.status }}
              </h3>
              <h3
                v-if="conversation.status == 'ONGOING'"
                class="p-0.5 bg-orange-100 text-orange-600"
              >
                {{ conversation.status }}
              </h3>
              <h3
                v-if="conversation.status == 'ON-QUEUE'"
                class="p-0.5 bg-orange-100 text-orange-600"
              >
                {{ conversation.status }}
              </h3>
              <h3
                v-if="conversation.status == 'ON-BOT'"
                class="p-0.5 bg-red-100 text-red-600"
              >
                {{ conversation.status }}
              </h3>
            </div>
            <div>
              <div>
                <h3 class="text-left mt-1">
                  {{ format_time(conversation.date) }}
                </h3>
              </div>
              <div v-if="conversation.channel == 'WhatsApp'">
                <img class="w-6 h-6 rounded-full order-1" :src="WhatsAppIcon" />
              </div>
              <div v-if="conversation.channel == 'Instagram'">
                <img
                  class="w-6 h-6 rounded-full order-1"
                  :src="InstagramIcon"
                />
              </div>
              <div v-if="conversation.channel == 'Facebook'">
                <img class="w-6 h-6 rounded-full order-1" :src="FacebookIcon" />
              </div>
              <div v-if="conversation.channel == 'Twitter'">
                <img class="w-6 h-6 rounded-full order-1" :src="TwitterIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-4">
        <div class="bg-white p-3">
          <div><ChatTranscriptCard /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhatsAppIcon from "@/assets/icons8-whatsapp.svg";
import FacebookIcon from "@/assets/icons8-facebook-circled.svg";
import InstagramIcon from "@/assets/icons8-instagram.svg";
import TwitterIcon from "@/assets/icons8-twitter.svg";
import moment from "moment";
import ChatTranscriptCard from "@/components/cards/ChatCards/ChatTranscriptCard.vue";
export default {
  methods: {
    format_time(data) {
      var moment_date = moment(data).format("YYYY-MM-DD, h:mm:ss a");
      return moment(moment_date).startOf("minute").fromNow();
    },
  },
  props: {
    recentConversations: {
      type: Array,

      required: false,
    },
  },
  components: { ChatTranscriptCard },

  data() {
    return {
      WhatsAppIcon: WhatsAppIcon,
      FacebookIcon: FacebookIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon,
      conversations: [
        {
          id: "#123",
          status: "Ongoing",
          date: "23rd September 2022",
          channel: "Whatsapp",
        },
        {
          id: "#569",
          status: "Ongoing",
          date: "23rd September 2022",
          channel: "Instagram",
        },
        {
          id: "#487",
          status: "Open",
          date: "23rd September 2022",
          channel: "Twitter",
        },
        {
          id: "#789",
          status: "Closed",
          date: "23rd September 2022",
          channel: "Facebook",
        },
        {
          id: "#345",
          status: "Closed",
          date: "23rd September 2022",
          channel: "Whatsapp",
        },
      ],
    };
  },
};
</script>

<style></style>
