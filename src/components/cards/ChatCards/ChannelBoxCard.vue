<template>
  <div
    class="p-3 max-w-sm bg-white rounded-sm shadow-sm dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex justify-between">
      <div>
        <h5 class="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
          {{
            channelAccount == "facebook"
              ? channelBox.page_name
              : channelBox.account_name
          }}
        </h5>
      </div>
      <div>
        <span
          v-if="channelBox.active == '0'"
          class="bg-red-100 text-red-700 rounded-sm px-1 py-0.5 text-xs"
          >Inactive</span
        >
        <span
          v-if="channelBox.active == '1'"
          class="bg-green-100 text-green-700 rounded-sm px-1 py-0.5 text-xs"
          >Active</span
        >
      </div>
    </div>
    <div class="flex justify-between">
      <div>
        <p class="my-2 font-normal text-xs text-gray-700 dark:text-gray-400">
          {{
            channelAccount == "facebook"
              ? channelBox.page_description
              : channelBox.description
          }}
        </p>
      </div>

      <!-- To Be Removed -->
      <!-- <img class="w-6 h-6 rounded-full order-1" :src="WhatsAppIcon" /> -->
      <div v-if="channelAccount == 'whatsapp'">
        <img class="w-6 h-6 rounded-full order-1" :src="WhatsAppIcon" />
      </div>
      <div v-if="channelAccount == 'instagram'">
        <img class="w-6 h-6 rounded-full order-1" :src="InstagramIcon" />
      </div>
      <div v-if="channelAccount == 'facebook'">
        <img class="w-6 h-6 rounded-full order-1" :src="FacebookIcon" />
      </div>
      <div v-if="channelAccount == 'twitter'">
        <img class="w-6 h-6 rounded-full order-1" :src="TwitterIcon" />
      </div>
    </div>

    <div class="flex justify-between">
      <!-- <div>
        <div v-if="channelBox.active == '0'">
          <button
            class="rounded-sm m-1 py-1 px-3 bg-red-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
          >
            Activate
          </button>
        </div>
        <div v-if="channelBox.active == '1'">
          <button
            class="rounded-sm m-1 py-1 px-3 bg-lime-500 text-white font-normal hover:bg-lime-700 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
          >
            Deactivate
          </button>
        </div>
      </div> -->
      <div class="">
        <button
          @click="handleEditChannelBox('Edit', channelBox)"
          class="rounded-sm m-2 p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
  <CreateChannelBoxModal
    :show="showCreateChannelBoxModal"
    :state="state"
    :currentChannelBox="currentChannelBox"
    :channelAccount="channelAccount"
  />
</template>

<script>
import FacebookIcon from "@/assets/icons8-facebook-circled.svg";
import InstagramIcon from "@/assets/icons8-instagram.svg";
import TwitterIcon from "@/assets/icons8-twitter.svg";
import WhatsAppIcon from "@/assets/icons8-whatsapp.svg";
import CreateChannelBoxModal from "@/components/modals/ChatModals/CreateChannelBoxModal.vue";
import { ref } from "vue";

export default {
  props: {
    channelBox: { type: Object, required: true },
    channelAccount: { type: String },
  },
  data() {
    return {
      state: "",
      currentChannelBox: {},
      WhatsAppIcon: WhatsAppIcon,
      FacebookIcon: FacebookIcon,
      InstagramIcon: InstagramIcon,
      TwitterIcon: TwitterIcon,
    };
  },
  components: { CreateChannelBoxModal },
  setup() {
    const showCreateChannelBoxModal = ref(false);

    return {
      showCreateChannelBoxModal,
    };
  },
  methods: {
    handleEditChannelBox(state, data) {
      this.state = state;
      this.currentChannelBox = data;
      this.showCreateChannelBoxModal = !this.showCreateChannelBoxModal;
    },
  },
};
</script>

<style></style>
