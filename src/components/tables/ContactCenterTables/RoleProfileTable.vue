<template>
  <div class="overflow-x-auto sm:rounded-lg p-1 mt-5">
    <div class="pt-4">
      <h1 class="font-semibold">Role Profiles</h1>
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
            <div v-if="data.access_right.length > 0">
              <span
                v-for="access in data.access_right"
                :key="access.id"
                class="flex flex-row"
              >
                <button
                  @click="handleRevokeAccess(data.id, access.access_name)"
                  class="rounded-sm mt-1 p-0.5 px-2 text-white bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
                >
                  {{ access?.access_name }}
                  <span class="material-icons text-white text-sm px-1 py-0"
                    >close</span
                  >
                </button>
              </span>
            </div>
            <span v-else class="text-red-400">N/A</span>
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.description }}
          </td>
          <td class="">
            <button
              @click="updateRoleProfile(data)"
              class="font-medium text-xs text-bg-gray-500 rounded-sm p-2 hover:bg-lime-600 hover:text-white"
            >
              Update Role Profile
            </button>
            <button
              @click="updateAccessRights(data)"
              class="font-medium text-xs text-bg-gray-500 rounded-sm p-2 hover:bg-blue-600 hover:text-white"
            >
              Change Access Rights
            </button>
            <button
              @click="viewRoleProfileUsers(data)"
              class="font-medium text-xs text-bg-gray-500 rounded-sm p-2 hover:bg-orange-600 hover:text-white"
            >
              View Users
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
    <UpdateRoleProfileModal :show="showModal" :currentRole="currentRole" />
    <EditAccessRightsModal
      :show="showEditModal"
      :currentAccessRightId="currentAccessRightId"
    />
    <RoleProfileUsers :show="showUsersModal" :currentRole="currentRole" />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ref } from "vue";
import UpdateRoleProfileModal from "../../modals/ContactCenterModals/updateRoleProfileModal.vue";
import EditAccessRightsModal from "../../modals/ContactCenterModals/EditAccessRightsModalV2.vue";
import RoleProfileUsers from "../../modals/ContactCenterModals/RoleProfileUsers.vue";

export default {
  name: "RoleProfileTable",
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
      currentRole: {},
      currentAccessRightId: "",
    };
  },
  setup() {
    const showModal = ref(false);
    const showEditModal = ref(false);
    const showUsersModal = ref(false);

    return {
      showModal,
      showEditModal,
      showUsersModal,
    };
  },
  components: {
    UpdateRoleProfileModal,
    EditAccessRightsModal,
    RoleProfileUsers,
  },
  methods: {
    ...mapActions(["revokeAccessRightsFromRoleProfile"]),
    updateRoleProfile(role) {
      this.currentRole = role;
      this.showModal = !this.showModal;
    },
    updateAccessRights(access) {
      this.currentAccessRightId = access.id;
      this.showEditModal = !this.showEditModal;
    },
    viewRoleProfileUsers(role) {
      this.currentRole = role;
      this.showUsersModal = !this.showUsersModal;
    },
    handleRevokeAccess(id, access) {
      if (confirm("Confirm Delete Access Right " + access + "?") == true) {
        console.log("revoking access", id, access);
        this.revokeAccessRightsFromRoleProfile({
          role_profile_id: id,
          access_right: access,
        });
      } else {
        console.log("revoking access cancelled");
      }
    },
  },
};
</script>

<style></style>
