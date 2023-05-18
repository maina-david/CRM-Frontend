<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
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
          :key="data"
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
            {{ data.form }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
            v-if="data.no_of_supervisors > 1"
          >
            <div v-for="value in data.supervisors" :key="value">
              {{ value.name }},
            </div>
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
            v-if="data.no_of_supervisors == 1"
          >
            {{ data.supervisors[0].name }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
            v-if="data.no_of_supervisors == 0"
          >
            No Supervisor has been added
          </td>

          <!-- <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.interactions }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.noOfAgentsPerUser }}
          </td> -->

          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div>
              <button
                @click="handleEditQualityAssuranceTeam('Edit', data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Edit
              </button>
            </div>
            <div>
              <button
                @click="handleViewQualityAssuranceTeams(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                View Users
              </button>
            </div>
            <div>
              <button
                @click="handleViewQualityAssuranceSupervisor(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                View Supervisors
              </button>
            </div>
            <div>
              <button
                @click="handleViewQualityAssuranceQueues(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                View Queues
              </button>
            </div>
            <div>
              <button
                @click="handleAddUsersToQualityAssuranceTeam(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Add Users
              </button>
            </div>
            <div>
              <button
                @click="handleAddUsersToQualityAssuranceSupervisor(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Add Supervisors
              </button>
            </div>
            <div>
              <button
                @click="handleAddQualityAssuranceForm(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Attach QA form
              </button>
            </div>
            <div>
              <button
                @click="handleAddQualityAssuranceQueue(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Attach Queue
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
  </div>
  <CreateTeamModal
    :show="showCreateTeamModal"
    :state="state"
    :currentQualityAssuranceTeam="currentQualityAssuranceTeam"
  />
  <AddForm
    :show="showAddFormModal"
    :currentQualityAssuranceTeam="currentQualityAssuranceTeam"
  />
  <ViewUsersTableModal
    :show="showTeamUsersModal"
    :currentQualityAssuranceTeam="currentQualityAssuranceTeam"
    :state="stateViewSupervisor"
  />
  <AddUsersToTeam
    :show="showAddTeamUsers"
    :currentQualityAssuranceTeam="currentQualityAssuranceTeam"
    :state="stateAddSupervisor"
  />
  <AddQueueModal
    :show="showAddQueueModal"
    :currentQualityAssuranceTeam="currentQualityAssuranceTeam"
  />
  <ViewQueuesModal
    :show="showViewQueuesModal"
    :currentQualityAssuranceTeam="currentQualityAssuranceTeam"
  />
</template>

<script>
import { ref } from "vue";
import CreateTeamModal from "@/components/modals/QAModals/CreateTeamModal.vue";
import AddForm from "@/components/modals/QAModals/AddForm.vue";
import ViewUsersTableModal from "@/components/modals/QAModals/ViewUsersTableModal.vue";
import AddUsersToTeam from "@/components/modals/QAModals/AddUsersToTeam.vue";
import AddQueueModal from "@/components/modals/QAModals/AddQueueModal.vue";
import ViewQueuesModal from "@/components/modals/QAModals/ViewQueuesModal.vue";

export default {
  name: "TeamTable",
  props: {
    tableHead: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
  },
  data() {
    return {
      state: "",
      currentQualityAssuranceTeam: {},
      stateAddSupervisor: false,
      stateViewSupervisor: false,
    };
  },
  setup() {
    const showCreateTeamModal = ref(false);
    const showAddFormModal = ref(false);
    const showTeamUsersModal = ref(false);
    const showAddTeamUsers = ref(false);
    const showAddQueueModal = ref(false);
    const showViewQueuesModal = ref(false);

    return {
      showCreateTeamModal,
      showAddFormModal,
      showTeamUsersModal,
      showAddTeamUsers,
      showAddQueueModal,
      showViewQueuesModal,
    };
  },
  methods: {
    handleEditQualityAssuranceTeam(state, data) {
      this.state = state;
      this.currentQualityAssuranceTeam = data;
      this.showCreateTeamModal = !this.showCreateTeamModal;
    },
    handleAddQualityAssuranceForm(data) {
      this.currentQualityAssuranceTeam = data;
      this.showAddFormModal = !this.showAddFormModal;
    },
    handleAddQualityAssuranceQueue(data) {
      this.currentQualityAssuranceTeam = data;
      this.showAddQueueModal = !this.showAddQueueModal;
    },
    handleViewQualityAssuranceTeams(data) {
      this.stateViewSupervisor = false;
      this.currentQualityAssuranceTeam = data;
      this.showTeamUsersModal = !this.showTeamUsersModal;
    },
    handleViewQualityAssuranceSupervisor(data) {
      this.stateViewSupervisor = true;
      this.currentQualityAssuranceTeam = data;
      this.showTeamUsersModal = !this.showTeamUsersModal;
    },
    handleViewQualityAssuranceQueues(data) {
      this.currentQualityAssuranceTeam = data;
      this.showViewQueuesModal = !this.showViewQueuesModal;
    },
    handleAddUsersToQualityAssuranceTeam(data) {
      this.stateAddSupervisor = false;
      this.currentQualityAssuranceTeam = data;
      this.showAddTeamUsers = !this.showAddTeamUsers;
    },
    handleAddUsersToQualityAssuranceSupervisor(data) {
      this.currentQualityAssuranceTeam = data;
      this.stateAddSupervisor = true;
      this.showAddTeamUsers = !this.showAddTeamUsers;
    },
  },
  components: {
    CreateTeamModal,
    AddForm,
    ViewUsersTableModal,
    AddUsersToTeam,
    AddQueueModal,
    ViewQueuesModal,
  },
};
</script>

<style></style>
