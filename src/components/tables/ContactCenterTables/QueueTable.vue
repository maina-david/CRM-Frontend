<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <div class="flex justify-between items-center pt-2">
      <div>
        <h1 class="text-lg font-semibold"></h1>
      </div>

      <div>
        <ActionButton
          @click="handleShowQueueModal('Create', {})"
          text="Create Queue"
        />
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
            {{ data.group?.name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.status }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.moh?.name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.time_out }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.wrap_up_time }}
          </td>
          <td class="py-2 px-3">
            <button
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-blue-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              @click="handleShowQueueModal('Edit', data)"
            >
              Update Queue
            </button>
            <button
              v-if="data.status == 'Active'"
              @click="handleToggleActive(data.id)"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-red-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Deactivate Queue
            </button>
            <button
              v-if="data.status == 'Disabled'"
              @click="handleToggleActive(data.id)"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Activate Queue
            </button>
            <button
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              @click="handleViewAgents(data.agents, data.id)"
            >
              View Agents
            </button>
            <button
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-blue-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              @click="handleAddAgents(data.agents, data.id)"
            >
              Add Agents
            </button>
            <button
              v-if="handleGuard(mohQueue)"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-blue-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              @click="handleAssignMoh(data.id)"
            >
              Assign MOH
            </button>
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
    <QueueModal
      :show="showQueueModal"
      :currentQueue="currentQueue"
      :currentState="currentState"
    />
    <ViewAgentsModal :show="showAgentsModal" :currentQueueID="currentQueueId" />
    <AddAgentsModal
      :show="showAddAgentsModal"
      :currentAgents="currentAgents"
      :currentQueueId="currentQueueId"
    />
    <AssignMohModal
      :show="showAssignMohModal"
      :currentQueueId="currentQueueId"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import QueueModal from "../../modals/ContactCenterModals/QueueModal.vue";
import ActionButton from "../../ActionButton.vue";
import ViewAgentsModal from "../../modals/ContactCenterModals/ViewAgentsModal.vue";
import AddAgentsModal from "../../modals/ContactCenterModals/AddAgentsModal.vue";
import AssignMohModal from "../../modals/ContactCenterModals/AssignMohModal.vue";
import Guard from "@/componentGuard.js";

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
    const showQueueModal = ref(false);
    const showAgentsModal = ref(false);
    const showAddAgentsModal = ref(false);
    const showAssignMohModal = ref(false);
    return {
      showQueueModal,
      showAgentsModal,
      showAddAgentsModal,
      showAssignMohModal,
    };
  },
  data() {
    return {
      currentQueue: {},
      currentState: "",
      currentAgents: [],
      currentQueueId: "",
      moh: "MOH Manager",
      mohQueue: "MOH Queue Manager",
      queue: "Queue Management",
      queueAgent: "Queue Agent Management",
    };
  },
  components: {
    QueueModal,
    ActionButton,
    ViewAgentsModal,
    AddAgentsModal,
    AssignMohModal,
  },
  methods: {
    handleViewAgents(data, queue_id) {
      this.showAgentsModal = !this.showAgentsModal;
      this.currentQueueId = queue_id;
      localStorage.setItem("current_queue_id", JSON.stringify(queue_id));
      console.log("this is the current queue", queue_id);
      localStorage.setItem("current_agents", JSON.stringify(data));
    },
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },

    ...mapActions(["activateDeactivateQueue"]),
    handleShowQueueModal(state, queue) {
      this.currentState = state;
      this.currentQueue = queue;
      console.log("this is the current queue", this.currentQueue);
      this.showQueueModal = !this.showQueueModal;
    },
    handleToggleActive(queueId) {
      if (confirm("Confirm Change Queue State") == true) {
        this.activateDeactivateQueue({
          id: queueId,
        });
      } else {
        console.log("deactivating access cancelled");
      }
    },
    handleAddAgents(agents, queue_id) {
      this.currentAgents = agents;
      this.currentQueueId = queue_id;
      this.showAddAgentsModal = !this.showAddAgentsModal;
    },
    handleAssignMoh(queue_id) {
      this.currentQueueId = queue_id;
      this.showAssignMohModal = !this.showAssignMohModal;
    },
  },
};
</script>

<style></style>
