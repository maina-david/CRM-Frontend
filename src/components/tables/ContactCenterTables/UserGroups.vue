<template>
  <div class="overflow-x-auto sm:rounded-lg p-1">
    <div class="flex justify-between items-center pt-2">
      <div>
        <h1 class="text-lg font-semibold">{{ currentGroup.name }}</h1>
      </div>
      <div class="flex flex-row">
        <div class="ml-6">
          <ActionButton @click="showModal = !showModal" text="Add Users" />
        </div>
        <div class="ml-6">
          <ActionButton
            @click="showAssignQueuesModal = !showAssignQueuesModal"
            text="Assign Queues"
          />
        </div>
      </div>
    </div>
    <div class="mt-4 flex gap-3">
      <div><h3 class="font-semibold">Assigned Queues:</h3></div>
      <span
        v-for="queue in groupQueues"
        :key="queue.id"
        class="bg-slate-50 p-1 flex flex-row"
      >
        <button
          @click="handleRemoveQueueFromGroup(queue)"
          class="rounded-sm mt-1 p-0.5 px-2 text-white bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
        >
          {{ queue.name }}
          <span class="material-icons text-white text-sm px-1 py-0">close</span>
        </button>
      </span>
    </div>
    <hr
      class="border-1 mt-5 border-gray-300 cursor-pointer hover:border-red-500 duration-500"
    />
    <div v-if="currentGroup.id && tableData.length < 1">
      <p class="text-4xl text-gray-400 text-center my-24">No Viewable Users</p>
    </div>
    <div v-else>
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
            class="bg-white border-b text-center p-2 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div class="p-3 m-3 text-center">
              You do not have any records to show
            </div>
          </tr>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="data in tableData"
            v-else
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
              {{ data.email }}
            </td>
            <td
              scope="row"
              class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ data.phone_number }}
            </td>
            <td
              scope="row"
              class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
            >
              <span
                v-if="data.status == 'ACTIVE'"
                class="rounded-sm m-2 p-1 text-white bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              >
                Active
              </span>
              <span
                v-if="data.status == 'DEACTIVATED'"
                :key="role"
                class="rounded-sm m-2 p-1 text-white bg-blue-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
              >
                Deactivated
              </span>
            </td>
            <td>
              <button
                v-if="data.status == 'ACTIVE'"
                @click="handleRemoveUser(currentGroup, data)"
                class="font-medium text-xs m-2 text-bg-gray-500 hover:text-red-600"
              >
                Remove User
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
            >1 - {{ tableData.length }}</span
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
    <EditUserGroupsModal :show="showModal" :currentGroup="currentGroup">
    </EditUserGroupsModal>
    <AssignQueuesToGroupsModal
      :show="showAssignQueuesModal"
      :currentGroup="currentGroup"
    >
    </AssignQueuesToGroupsModal>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import ActionButton from "../../ActionButton.vue";
import EditUserGroupsModal from "../../modals/ContactCenterModals/EditUserGroupsModal.vue";
import AssignQueuesToGroupsModal from "../../modals/ContactCenterModals/AssignQueuesToGroupsModal.vue";

export default {
  name: "UserGroups",
  props: {
    tableHead: {
      type: Array,
    },
    tableData: {
      type: Array,
    },
    groupQueues: {
      type: Array,
    },
    currentGroup: {
      type: Object,
    },
  },
  components: {
    ActionButton,
    EditUserGroupsModal,
    AssignQueuesToGroupsModal,
  },
  setup() {
    const showModal = ref(false);
    const showAssignQueuesModal = ref(false);
    return {
      showModal,
      showAssignQueuesModal,
    };
  },
  data() {
    return {
      closeCard: true,
    };
  },
  created() {
    this.getGroups();
  },
  updated() {
    this.getGroups();
  },
  methods: {
    ...mapActions([
      "deleteUsersFromGroup",
      "removeGroupFromQueue",
      "getGroups",
    ]),
    handleRemoveUser(group, user) {
      if (
        confirm("Confirm Delete " + user.name + " from " + group.name + "?") ==
        true
      ) {
        this.deleteUsersFromGroup({
          user_id: user.id,
          group_id: group.id,
        });
      } else {
        console.log("deleting cancelled");
      }
    },
    handleRemoveQueueFromGroup(queue) {
      if (confirm("Confirm Remove " + queue.name + " from group?") == true) {
        this.removeGroupFromQueue({
          queue_id: queue.id,
        });
      } else {
        console.log("remove queue cancelled");
      }
      this.$emit("closeCard", this.closeCard);
    },
  },
};
</script>

<style></style>
