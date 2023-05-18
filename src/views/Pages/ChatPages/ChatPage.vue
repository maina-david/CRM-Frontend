<template>
  <main>
    <div class="p-5">
      <div class="flex justify-between pt-6 py-2 border-b">
        <div
          class="flex items-center space-x-3 hover:border-gray-400 mb-4 rounded-lg"
        >
          <div class="flex-shrink-0">
            <Avatar :initials="username" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800">{{ username }}</p>
            <p class="text-sm text-gray-500 truncate">{{ roleProfile }}</p>
          </div>
        </div>
        <div class="flex gap-5">
          <div>
            <router-link :to="{ name: 'ClosedChatsPage' }">
              <ActionButton text="View Closed Conversations" />
            </router-link>
          </div>
          <div @click="showKnowledgeModal = !showKnowledgeModal">
            <ActionButton text="Knowledge Base" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-2 pt-5">
        <div class="col-span-2 mt-24">
          <div class="overflow-hidden mt-10 bg-white shadow-lg">
            <h3 class="text-sm font-semibold p-4">Channels</h3>
            <Suspense
              v-for="account in conversationChannels"
              :key="account.channel_id"
            >
              <template #default>
                <AccordionChat
                  @click="handleOpenAccounts(account)"
                  :account="account"
                >
                </AccordionChat>
              </template>
              <template #fallback> loading </template>
            </Suspense>
          </div>
          <!--Content Here-->
        </div>
        <div
          v-if="currentAccount.channel_id"
          class="col-span-4 bg-white shadow-lg p-3"
        >
          <div class="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <h3 class="text-sm font-semibold">
              {{ currentAccount.channel_name }}
            </h3>
            <div class="h-full">
              <SearchBar />
              <div class="overflow-y-auto h-96 p-3">
                <div
                  v-for="chat in channelConversations"
                  :key="chat.conversation_id"
                >
                  <div
                    @click="handleOpenAccountChat(chat)"
                    class="rounded-lg px-2 py-1 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 hover:bg-gray-200"
                  >
                    <Contacts :accountChats="chat" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-6" v-if="currentAccount.channel_id">
          <ChatSection
            @resetConversations="handleResetConversations()"
            :currentAccountChat="currentAccountChat"
            :messages="messages"
          />
        </div>
      </div>
    </div>
    <CreateSocialMediaAccount :show="showCreateSocialMediaAccount" />
  </main>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import Avatar from "@/components/avatar/Avatar.vue";
import ActionButton from "@/components/ActionButton.vue";
import SearchBar from "@/components/SearchBar.vue";
import ChatSection from "@/components/Chat/ChatSection.vue";
import Contacts from "@/components/Chat/Contacts.vue";
import AccordionChat from "@/components/AccordionChat.vue";
import CreateSocialMediaAccount from "@/components/modals/ChatModals/CreateSocialMediaAccount.vue";

export default {
  watch: {
    conversationChannels() {
      console.log("conversation data", this.conversationChannels);
    },
  },
  name: "ChatPage",
  components: {
    Avatar,
    SearchBar,
    ChatSection,
    Contacts,
    AccordionChat,
    CreateSocialMediaAccount,
    ActionButton,
  },
  data() {
    return {
      username: "",
      roleProfile: "",
      currentAccount: {},
      currentAccountChat: {},
      accountChats: [],
    };
  },
  setup() {
    const showCreateSocialMediaAccount = ref(false);
    const showKnowledgeModal = ref(false);

    return {
      showCreateSocialMediaAccount,
      showKnowledgeModal,
    };
  },
  created() {
    this.username = localStorage.getItem("username");
    this.roleProfile = JSON.parse(localStorage.getItem("role_profile"))?.name;
    this.getAssignedConversations();
    this.getConversationChannels();
  },
  methods: {
    ...mapActions([
      "getAssignedConversations",
      "getChannelConversations",
      "getMessagesInAConversation",
      "getConversationChannels",
      "storeConversationDetailsPhone",
      "storeConversationDetailsChannel",
      "storeConversationDetailsConversationID",
      "getCurrentCall",
    ]),
    handleOpenAccounts(data) {
      this.currentAccount = data;
      this.storeConversationDetailsChannel(data.channel_id);
      this.currentAccountChat = {};
      this.getChannelConversations({
        channel_id: data.channel_id,
      });
    },
    handleOpenAccountChat(data) {
      console.log("the current conversation data", data);
      this.storeConversationDetailsPhone(data.customer_id);
      this.storeConversationDetailsConversationID(data.conversation_id);
      this.currentAccountChat = data;
      localStorage.setItem(
        "current_ticket_channel",
        JSON.stringify(this.currentConversationDetails.channel_id)
      );
      this.getMessagesInAConversation({
        conversation_id: data.conversation_id,
      });
      if (this.currentConversationDetails.channel_id == 1) {
        console.log("I am getting a whatsapp message");
        this.getCurrentCall(this.currentConversationDetails.channel_identifier);
      } else {
        console.log("give me another API");
      }
    },
    handleResetConversations(val) {
      console.log("reset conversations", val);
      this.currentAccountChat = {};
      this.currentAccount = {};
    },
  },
  computed: {
    ...mapGetters([
      "assignedConversations",
      "channelConversations",
      "messages",
      "conversationChannels",
      "currentConversationDetails",
    ]),
  },
};
</script>

<style scoped>
*,
:after,
:before {
  margin: 0;
}
body {
  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
  margin: 10px;
  padding: 0;
}

#app {
  margin: 0px;
  border-radius: 8px;
}
.el-main {
  padding: 0;
}
.scroll-y {
  overflow-y: auto;
  max-height: 100vh;
}
</style>
