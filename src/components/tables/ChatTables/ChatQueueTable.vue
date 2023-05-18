<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <div class="flex justify-between items-center pt-2">
      <div>
        <h1 class="text-lg font-semibold"></h1>
      </div>
    </div>
    <table
      class="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400 p-4"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            scope="col"
            class="py-2 px-3"
            v-for="head in tableHead"
            :key="head"
          >
            {{ head }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="tableData.length <= 0"
          class="bg-white border-b dark:bg-gray-800 text-center p-2 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <div class="p-3 m-3 text-center">
            You do not have any records to show
          </div>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-else
          v-for="data in tableData"
          :key="data.id"
        >
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.description }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              v-if="data.active == '1'"
              class="bg-green-100 text-green-700 px-2 py-1"
              >ACTIVE</span
            >
            <span
              v-if="data.active == '0'"
              class="bg-red-100 text-red-700 px-2 py-1"
              >DEACTIVATED</span
            >
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.timeout }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.max_open_conversation }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.autoreply_message?.autoreply_message }}
          </td>
          <td class="py-2 px-3">
            <button
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-blue-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              @click="handleShowQueueModal('Edit', data)"
            >
              Update Chat Queue
            </button>
            <button
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              @click="handleUsersInChatQueue(data)"
            >
              View Users In Chat Queue
            </button>
            <button
              v-if="!data.autoreply_message"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              @click="handleAutoReplyMessage(data, 'Add')"
            >
              Add AutoReply Message
            </button>
            <button
              v-else
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              @click="handleAutoReplyMessage(data, 'Remove')"
            >
              Remove AutoReply Message
            </button>
            <div v-if="data.active == '1'">
              <button
                @click="handleToggleActivateChatQueue(data, 'DEACTIVATE')"
                class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              >
                Deactivate
              </button>
            </div>
            <div v-if="data.active == '0'">
              <button
                @click="handleToggleActivateChatQueue(data, 'ACTIVATE')"
                class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              >
                Activate
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <nav
      class="flex justify-between items-center pt-4"
      aria-label="Table navigation"
    >
      <span class="text-sm font-normal text-gray-500"
        >Showing
        <span class="font-semibold text-gray-900"
          >1- {{ tableData.length }}</span
        >
        of
        <span class="font-semibold text-gray-900">{{
          tableData.length
        }}</span></span
      >
      <ul class="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >2</a
          >
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            class="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >3</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >...</a
          >
        </li>
        <li>
          <a
            href="#"
            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >100</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span class="sr-only">Next</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
    <CreateChatQueueModal
      :show="showChatQueueModal"
      :currentQueue="currentQueue"
      :state="state"
    />
    <AddAutoReplyChatQueueModal
      :show="showAddAutoReplyChatQueueModal"
      :currentQueue="currentQueue"
    />
    <ViewUsersInChatQueue
      :currentQueue="currentQueue"
      :show="showUsersInChatQueue"
    />
    <AddUsersToChatQueue :show="showAddUsersToChatQueueModal" />
    <AddGroupsToChatQueue :show="showAddGroupsToChatQueueModal" />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import CreateChatQueueModal from "@/components/modals/ChatModals/CreateChatQueueModal.vue";
import AddAutoReplyChatQueueModal from "@/components/modals/ChatModals/AddAutoReplyChatQueueModal.vue";
import ViewUsersInChatQueue from "@/components/modals/ChatModals/ViewUsersInChatQueue.vue";
import AddUsersToChatQueue from "@/components/modals/ChatModals/AddUsersToChatQueue.vue";
import AddGroupsToChatQueue from "@/components/modals/ChatModals/AddGroupsToChatQueue.vue";

export default {
  name: "QueueTable",
  props: {
    tableHead: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
  },
  setup() {
    const showChatQueueModal = ref(false);
    const showAddAutoReplyChatQueueModal = ref(false);
    const showUsersInChatQueue = ref(false);
    const showAddUsersToChatQueueModal = ref(false);
    const showAddGroupsToChatQueueModal = ref(false);
    return {
      showChatQueueModal,
      showAddAutoReplyChatQueueModal,
      showUsersInChatQueue,
      showAddUsersToChatQueueModal,
      showAddGroupsToChatQueueModal,
    };
  },
  data() {
    return {
      currentQueue: {},
      state: "",
      currentAgents: [],
      currentQueueId: "",
    };
  },
  components: {
    CreateChatQueueModal,
    AddAutoReplyChatQueueModal,
    ViewUsersInChatQueue,
    AddUsersToChatQueue,
    AddGroupsToChatQueue,
  },
  methods: {
    ...mapActions([
      "removeAutoreplyMessageFormoChatQueue",
      "activateChatQueue",
      "deactivateChatQueue",
    ]),
    handleShowQueueModal(state, queue) {
      this.state = state;
      this.currentQueue = queue;
      this.showChatQueueModal = !this.showChatQueueModal;
    },
    handleUsersInChatQueue(queue) {
      this.currentQueue = queue;
      this.showUsersInChatQueue = !this.showUsersInChatQueue;
    },
    handleAutoReplyMessage(queue, action) {
      if (action == "Add") {
        this.currentQueue = queue;
        this.showAddAutoReplyChatQueueModal =
          !this.showAddAutoReplyChatQueueModal;
      } else {
        if (
          confirm("Confirm remove " + queue.name + " AutoReplyMessage?") == true
        ) {
          console.log("remove autoreply message", queue.name);
          this.removeAutoreplyMessageFormoChatQueue({
            chat_queue_id: queue.id,
          });
        } else {
          console.log("remove autoreply message cancelled");
        }
      }
    },
    handleToggleActivateChatQueue(data, action) {
      if (confirm("Confirm " + action + " from Chat Queue?") == true) {
        console.log("de/activate Chat Queues", data.id);
        if (action == "ACTIVATE") {
          this.activateChatQueue({
            chat_queue_id: data.id,
          });
        } else {
          this.deactivateChatQueue({
            chat_queue_id: data.id,
          });
        }
      } else {
        console.log("de/activate Chat Queues cancelled");
      }
    },
  },
};
</script>

<style></style>
