<template>
  <main>
    <div class="m-10">
      <div class="flex justify-between border-b p-3 mt-10">
        <div class="">
          <h2 class="font-bold text-lg">Channel Box</h2>
        </div>
        <div>
          <ActionButton
            @click="handleCreateChannelBox('Create', {})"
            text="Create a Channel Box"
          />
        </div>
      </div>
      <div class="mt-10 flex mb-5">
        <img class="w-6 h-6 rounded-full mr-2" :src="WhatsAppIcon" />
        <h3 class="font-bold text-md">Whatsapp Accounts</h3>
      </div>
      <div class="grid grid-cols-4 gap-4 m-3">
        <div
          v-for="whatsapp in companyAccounts.whatsapp_accounts"
          :key="whatsapp.id"
        >
          <ChannelBoxCard :channelBox="whatsapp" channelAccount="whatsapp" />
        </div>
      </div>

      <div class="mt-10 flex mb-5">
        <img class="w-6 h-6 rounded-full mr-2" :src="TwitterIcon" />
        <h3 class="font-bold text-md">Twitter Accounts</h3>
      </div>
      <div class="grid grid-cols-4 gap-4 m-3">
        <div
          v-for="twitter in companyAccounts.twitter_accounts"
          :key="twitter.id"
        >
          <ChannelBoxCard :channelBox="twitter" channelAccount="twitter" />
        </div>
      </div>

      <div class="mt-10 flex mb-5">
        <img class="w-6 h-6 rounded-full mr-2" :src="FacebookIcon" />
        <h3 class="font-bold text-md">Facebook Accounts</h3>
      </div>
      <div class="grid grid-cols-4 gap-4 m-3">
        <div
          v-for="facebook in companyAccounts.facebook_accounts"
          :key="facebook.id"
        >
          <ChannelBoxCard :channelBox="facebook" channelAccount="facebook" />
        </div>
      </div>

      <div class="mt-10 flex mb-5">
        <img class="w-6 h-6 rounded-full mr-2" :src="InstagramIcon" />
        <h3 class="font-bold text-md">Instagram Accounts</h3>
      </div>
      <div class="grid grid-cols-4 gap-4 m-3">
        <div
          v-for="instagram in companyAccounts.instagram_accounts"
          :key="instagram.id"
        >
          <ChannelBoxCard :channelBox="instagram" channelAccount="instagram" />
        </div>
      </div>
    </div>
    <CreateChannelBoxModal
      :show="showCreateChannelBoxModal"
      :state="state"
      :currentChannelBox="currentChannelBox"
    />
  </main>
</template>

<script>
import FacebookIcon from "@/assets/icons8-facebook-circled.svg";
import InstagramIcon from "@/assets/icons8-instagram.svg";
import TwitterIcon from "@/assets/icons8-twitter.svg";
import WhatsAppIcon from "@/assets/icons8-whatsapp.svg";
import ActionButton from "@/components/ActionButton.vue";
import ChannelBoxCard from "@/components/cards/ChatCards/ChannelBoxCard.vue";
import CreateChannelBoxModal from "@/components/modals/ChatModals/CreateChannelBoxModal.vue";
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { ActionButton, CreateChannelBoxModal, ChannelBoxCard },
  data() {
    return {
      state: "",
      currentChannelBox: {},
      channelBoxes: [
        {
          name: "Sales WhatsApp Account",
          description:
            "This is basically a description of the Sales WhatsApp Account",
          status: "Active",
          channel: "WhatsApp",
          chatFlow: "Chat Flow 1",
        },
        {
          name: "Sales Instagram Account",
          description:
            "This is basically a description of the Sales Instagram Account",
          status: "Inactive",
          channel: "Instagram",
          chatFlow: "Chat Flow 3",
        },
        {
          name: "Sales Facebook Account",
          description:
            "This is basically a description of the Sales Facebook Account",
          status: "Active",
          channel: "Facebook",
          chatFlow: "Chat Flow 1",
        },
        {
          name: "Sales Twitter Account",
          description:
            "This is basically a description of the Sales Twitter Account",
          status: "Active",
          channel: "Twitter",
          chatFlow: "Chat Flow 1",
        },
      ],
      WhatsAppIcon: WhatsAppIcon,
      FacebookIcon: FacebookIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon,
    };
  },
  setup() {
    const showCreateChannelBoxModal = ref(false);

    return {
      showCreateChannelBoxModal,
    };
  },
  created() {
    this.getCompanyaccounts();
  },
  methods: {
    ...mapActions(["getCompanyaccounts"]),
    handleCreateChannelBox(state, data) {
      this.state = state;
      this.currentChannelBox = data;
      this.showCreateChannelBoxModal = !this.showCreateChannelBoxModal;
    },
  },
  computed: {
    ...mapGetters(["companyAccounts"]),
  },
};
</script>

<style></style>
