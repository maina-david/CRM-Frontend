<template>
  <div>
    <div
      class="bg-white h-12 text-xs w-full pl-5 flex items-center rounded-sm border-b hover:bg-slate-200"
    >
      <div class="flex gap-2">
        <div v-if="account.channel_name == 'WhatsApp'">
          <img class="w-6 h-6 rounded-full order-1" :src="WhatsAppIcon" />
        </div>
        <div v-if="account.channel_name == 'Instagram'">
          <img class="w-6 h-6 rounded-full order-1" :src="InstagramIcon" />
        </div>
        <div v-if="account.channel_name == 'Facebook'">
          <img class="w-6 h-6 rounded-full order-1" :src="FacebookIcon" />
        </div>
        <div v-if="account.channel_name == 'Twitter'">
          <img class="w-6 h-6 rounded-full order-1" :src="TwitterIcon" />
        </div>
        <div v-if="account.channel_name == 'Email'">
          <img class="w-6 h-6 rounded-full order-1" :src="EmailIcon" />
        </div>
        <div>
          <div
            @click="(isOpen = !isOpen), action_click(account)"
            class="cursor-pointer"
          >
            <h3 class="text-sm">{{ account.channel_name }}</h3>
          </div>
        </div>
        <div
          v-if="account.assigned_conversations != 0"
          class="text-white text-xs bg-lime-500 rounded-full px-2 py-1"
        >
          <span>{{ account.assigned_conversations }}</span>
        </div>
        <div
          v-if="account.unread_messages != 0"
          class="text-white text-xs bg-red-500 rounded-full px-2 py-1"
        >
          <span>{{ account.unread_messages }}</span>
        </div>
      </div>
    </div>
    <div class="mb-4" :class="isOpen ? 'd-block' : 'hidden'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import WhatsAppIcon from "@/assets/icons8-whatsapp.svg";
import FacebookIcon from "@/assets/icons8-facebook-circled.svg";
import InstagramIcon from "@/assets/icons8-instagram.svg";
import TwitterIcon from "@/assets/icons8-twitter.svg";
import EmailIcon from "@/assets/email.svg";
import { mapActions, mapGetters } from "vuex";

export default {
  created() {},
  methods: {
    ...mapActions(["getConversationChannels"]),
    action_click(account) {
      console.log(account);
    },
  },
  computed: {
    ...mapGetters(["conversationChannels"]),
  },
  props: {
    account: { type: Object },
  },
  data() {
    return {
      WhatsAppIcon: WhatsAppIcon,
      FacebookIcon: FacebookIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon,
      EmailIcon: EmailIcon,
      isOpen: false,
    };
  },
};
</script>

<style></style>
