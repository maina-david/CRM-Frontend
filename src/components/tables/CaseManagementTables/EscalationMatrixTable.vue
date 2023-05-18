<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <div class="pt-2">
      <h1 class="font-semibold">Escalation Points</h1>
      <hr
        class="border-1 mt-5 border-gray-300 cursor-pointer hover:border-red-500 duration-500"
      />
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
            <span
              v-if="data.escalation_levels_count"
              class="bg-green-100 text-green-700 px-2 py-1"
              >{{ data.escalation_levels_count }}</span
            >
            <span v-else class="bg-red-100 text-red-700 px-2 py-1"
              >No Level Attached</span
            >
          </td>

          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <div>
              <button
                @click="handleAddEscalationMatrix(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Add Escalation Matrix
              </button>
            </div>
            <div>
              <button
                @click="handleAddPriority(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Add Priority
              </button>
            </div>
            <div>
              <button
                @click="handleEditEscalationMatrix(data, 'Edit')"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Edit
              </button>
            </div>
            <div>
              <router-link
                :to="{
                  name: 'EscalationLevels',
                }"
              >
                <button
                  class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
                  @click="escalation_point_data(data)"
                >
                  Manage Level
                </button>
              </router-link>
            </div>
            <div v-if="data.active == 1">
              <button
                @click="handleDeactivateEscalationMatrix(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-red-500 hover:text-white"
              >
                Deactivate
              </button>
            </div>
            <div v-if="data.active == 0">
              <button
                @click="handleActivateEscalationMatrix(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-lime-500 hover:text-white"
              >
                Activate
              </button>
            </div>
            <div>
              <button
                @click="handleDeleteEscalationMatrix(data)"
                class="font-medium text-xs text-center m-2 px-2 py-1 text-gray-500 rounded-sm hover:bg-red-500 hover:text-white"
              >
                Delete
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
  <CreateEscalationMatrix
    :show="showCreateEscalationMatrix"
    :state="state"
    :currentEscalationMatrix="currentEscalationMatrix"
  />
  <AddEscalationPointModal :show="showAddEscalationPointModal" />
  <ManageLevelsModal :show="showManageLevelsModal" />
  <AddPriorityModal :show="showAddPriorityModal" />
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import CreateEscalationMatrix from "@/components/modals/CaseManagementModals/CreateEscalationMatrix.vue";
import AddEscalationPointModal from "@/components/modals/CaseManagementModals/AddEscalationPointModal.vue";
import ManageLevelsModal from "@/components/modals/CaseManagementModals/ManageLevelsModal.vue";
import AddPriorityModal from "@/components/modals/CaseManagementModals/AddPriorityModal.vue";

export default {
  name: "EscalationMatrixTable",
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
      currentEscalationMatrix: {},
    };
  },
  setup() {
    const showCreateEscalationMatrix = ref(false);
    const showAddEscalationPointModal = ref(false);
    const showManageLevelsModal = ref(false);
    const showAddPriorityModal = ref(false);

    return {
      showCreateEscalationMatrix,
      showAddEscalationPointModal,
      showManageLevelsModal,
      showAddPriorityModal,
    };
  },
  components: {
    CreateEscalationMatrix,
    AddEscalationPointModal,
    ManageLevelsModal,
    AddPriorityModal,
  },
  methods: {
    ...mapActions([
      "deleteTicketEscalationMatrix",
      "activateTicketEscalationMatrix",
      "deactivateTicketEscalationMatrix",
    ]),
    escalation_point_data(data) {
      localStorage.setItem("escalation_point_current", JSON.stringify(data));
    },
    handleEditEscalationMatrix(data, state) {
      this.state = state;
      this.currentEscalationMatrix = data;
      this.showCreateEscalationMatrix = !this.showCreateEscalationMatrix;
    },
    handleDeleteEscalationMatrix(data) {
      if (confirm("Confirm DELETE " + data.name) == true) {
        console.log("confirm delete ticket escalation matrix", data.name);
        this.deleteTicketEscalationMatrix({
          escalation_matrix_id: data.id,
        });
      } else {
        console.log("cancel delete ticket escalation matrix");
      }
    },
    handleAddPriority(data) {
      this.showAddPriorityModal = !this.showAddPriorityModal;
      console.log(data);
    },
    handleDeactivateEscalationMatrix(data) {
      if (confirm("Confirm DEACTIVATE " + data.name) == true) {
        console.log("confirm deactivate ticket escalation matrix", data.name);
        this.deactivateTicketEscalationMatrix({
          escalation_matrix_id: data.id,
        });
      } else {
        console.log("cancel deactivate ticket escalation matrix");
      }
    },
    handleActivateEscalationMatrix(data) {
      if (confirm("Confirm ACTIVATE " + data.name) == true) {
        console.log("confirm activate ticket escalation matrix", data.name);
        this.activateTicketEscalationMatrix({
          escalation_matrix_id: data.id,
        });
      } else {
        console.log("cancel activate ticket escalation matrix");
      }
    },
    handleAddEscalationMatrix(data) {
      localStorage.setItem("current_escalation_point", data.id);
      localStorage.setItem("escalation_point_current", JSON.stringify(data));
      console.log("i am logging json data", data);
      this.showAddEscalationPointModal = !this.showAddEscalationPointModal;
      console.log(data);
    },
  },
};
</script>

<style></style>
