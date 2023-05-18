<template>
  <div class="flex flex-col">
    <div class="grid grid-cols-4">
      <div class="flex m-4" v-for="chatFlow in chatFlows" :key="chatFlow.id">
        <div
          class="p-5 max-w-sm bg-white rounded-sm border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="justify-between flex my-1">
            <div>
              <h5 class="text-gray-900 text-sm leading-tight font-semibold">
                {{ chatFlow.name }}
              </h5>
            </div>
            <div>
              <button
                @click="handleEditChatBot(chatFlow, 'Edit')"
                class="rounded-sm p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              >
                Edit
              </button>
            </div>
          </div>
          <p class="text-gray-700 text-sm mb-4">
            {{ chatFlow.description }}
          </p>

          <span class="grid gap-1" v-if="chatFlow?.accounts">
            <span
              v-for="(account, index) in chatFlow.accounts"
              :key="index"
              class="rounded-sm m-1 p-1 text-green-700 bg-green-100 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              {{ account.name }}
              <span class="material-icons text-xs ml-3">close</span>
            </span>
          </span>

          <div class="grid grid-flow-col gap-4 mt-3 justify-between">
            <div>
              <button
                @click="handleAddAccountToChatBot(chatFlow)"
                class="rounded-sm m-2 p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              >
                Add Account
              </button>
            </div>
            <div>
              <button
                @click="handleViewLinkedAccounts(chatFlow)"
                class="rounded-sm m-2 p-1 text-blue-800 underline font-normal hover:text-green-500 text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              >
                View Linked Accounts
              </button>
            </div>
          </div>
          <div>
            <router-link :to="{ name: 'CreateChat' }">
              <ActionButton
                @click="handleCreateChatFlow(chatFlow.id)"
                text="Manage Chat Flow"
                class="bg-lime-500"
              ></ActionButton>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <AddAccountToChatFlow
      :currentChatBot="currentChatBot"
      :show="showAddAccountToChatFlow"
    />
    <CreateChatModal
      :state="state"
      :currentChatBot="currentChatBot"
      :show="showCreateChatFlowModal"
    />
    <LinkedAccountsModal
      :currentChatBot="currentChatBot"
      :show="showLinkedAccounts"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import ActionButton from "@/components/ActionButton.vue";
import AddAccountToChatFlow from "@/components/modals/ChatModals/AddAccountToChatFlow.vue";
import CreateChatModal from "@/components/modals/ChatModals/CreateChatModal.vue";
import LinkedAccountsModal from "@/components/modals/ChatModals/LinkedAccountsModal.vue";

export default {
  name: "ChatFlowCard",
  props: { chatFlows: { type: Array } },
  data() {
    return {
      state: "",
      currentChatBot: {},
    };
  },
  components: {
    ActionButton,
    AddAccountToChatFlow,
    CreateChatModal,
    LinkedAccountsModal,
  },
  setup() {
    const showAddAccountToChatFlow = ref(false);
    const showCreateChatFlowModal = ref(false);
    const showLinkedAccounts = ref(false);
    return {
      showAddAccountToChatFlow,
      showCreateChatFlowModal,
      showLinkedAccounts,
    };
  },
  methods: {
    handleEditChatBot(data, state) {
      this.state = state;
      this.currentChatBot = data;
      this.showCreateChatFlowModal = !this.showCreateChatFlowModal;
    },
    handleAddAccountToChatBot(data) {
      this.currentChatBot = data;
      this.showAddAccountToChatFlow = !this.showAddAccountToChatFlow;
    },
    handleViewLinkedAccounts(data) {
      this.currentChatBot = data;
      this.showLinkedAccounts = !this.showLinkedAccounts;
    },
    handleCreateChatFlow(id) {
      console.log("create chat flow id", id);
      localStorage.setItem("chat_flow_id", id);
    },
  },
};
</script>

<style></style>
