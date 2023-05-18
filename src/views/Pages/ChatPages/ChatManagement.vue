<template>
  <main>
    <div class="ml-12">
      <div class="mt-10 border-b flex justify-between">
        <div>
          <h2 class="font-bold text-xl p-3">Chat Management (Chat Bot)</h2>
        </div>

        <div class="grid grid-cols-2 gap-6">
          <div>
            <ActionButton
              @click="handleCreateChatBot({}, 'Create')"
              text="Create Chat Flow"
            />
          </div>
          <div>
            <router-link :to="{ name: 'AttachmentFiles' }">
              <ActionButton text="View Files" />
            </router-link>
          </div>
        </div>
      </div>
      <EmptyChat
        v-if="chatFlows.length <= 0"
        message="You currently have no Chat, Please create one using the button below"
      />
      <div v-else>
        <ChatFlowCard :chatFlows="chatBots" />
      </div>
      <CreateChatModal
        :state="state"
        :currentChatBot="currentChatBot"
        :show="showCreateChatModal"
      />
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import { mapGetters, mapActions } from "vuex";
import EmptyChat from "@/components/EmptyChat.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateChatModal from "@/components/modals/ChatModals/CreateChatModal.vue";
import ChatFlowCard from "@/components/cards/ChatCards/ChatFlowCard.vue";
/*import Channel from "@/componentGuard.js";
import groupManagement from "@/componentGuard.js";
import ClickToCall from "@/componentGuard.js";
import Inbound from "@/componentGuard.js";
import Outbound from "@/componentGuard.js";
import Company from "@/componentGuard.js";*/
/*import RoleProfile from "@/componentGuard.js";*/
//import UserManagement from "@/componentGuard.js";

export default {
  name: "ChatManagement",
  data() {
    return {
      state: "",
      currentChatBot: {},
      message: "",
      chatFlows: [
        {
          name: "Chat Flow One",
          description: "This is the description chat flow chat",
          accounts: [
            { name: "Whatsapp Sales Account" },
            { name: "Whatsapp Sales Account" },
            { name: "Whatsapp Sales Account" },
          ],
        },
      ],
    };
  },
  setup() {
    const showCreateChatModal = ref(false);

    return {
      showCreateChatModal,
    };
  },

  components: { EmptyChat, ActionButton, CreateChatModal, ChatFlowCard },
  created() {
    this.getChatBot();
  },
  computed: {
    ...mapGetters(["chatBots"]),
  },
  methods: {
    ...mapActions(["getChatBot"]),
    handleCreateChatBot(data, state) {
      this.state = state;
      this.currentChatBot = data;
      this.showCreateChatModal = !this.showCreateChatModal;
    },
  },
};
</script>

<style></style>
