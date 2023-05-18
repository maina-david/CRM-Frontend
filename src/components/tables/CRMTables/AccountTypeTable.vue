<template>
  <div class="sm:rounded-lg p-1 mt-2">
    <table
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-1"
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
            {{ data.account_number_id }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              v-if="!data.account_form?.name"
              class="bg-red-100 text-xs text-red-700 flex align-center text-center px-2 py-1 m-1"
              >No attached account form
            </span>
            <span v-else>
              {{ data.account_form?.name }}
            </span>
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            -
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              v-if="!data.contact_form?.name"
              class="bg-red-100 text-xs text-red-700 flex align-center text-center px-2 py-1 m-1"
              >No attached contact form
            </span>
            <span v-else>
              {{ data.contact_form?.name }}
            </span>
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              v-if="data.groups.length == 0"
              class="bg-red-100 text-xs text-red-700 flex align-center text-center px-2 py-1 m-1"
              >No attached group
            </span>
            <span
              v-else
              class="bg-slate-100 text-xs text-slate-700 flex align-center text-center px-2 py-1 m-1"
              v-for="group in data.groups"
              :key="group"
              >{{ group.name }}
              <span
                @click="handleRemoveGroupFromAccount(group, data)"
                class="material-icons text-xs text-center mx-1 text-slate-700"
                >close</span
              ></span
            >
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ data.account_number_id }}
          </td>
          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span
              v-if="data.status == 'ACTIVE'"
              class="bg-green-100 text-xs text-green-700 flex align-center text-center px-2 py-1 m-1"
              >{{ data.status }}
            </span>
            <span
              v-else
              class="bg-red-100 text-xs text-red-700 flex align-center text-center px-2 py-1 m-1"
              >{{ data.status }}
            </span>
          </td>

          <td
            scope="row"
            class="py-2 px-3 font-medium text-xs text-gray-900 whitespace-nowrap dark:text-white"
          >
            <button
              @click="handleAttachGroup(data)"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Attach Group
            </button>
            <button
              @click="handleAttachAccountNumber(data)"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Attach Account Number
            </button>
            <button
              v-if="!data.account_form?.name"
              @click="handleAccountForm(data)"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Attach Account Form
            </button>
            <button
              v-if="!data.contact_form?.name"
              @click="handleContactForm(data)"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Attach Contact Form
            </button>
            <button
              @click="handleEditAccountType(data, 'Edit')"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-green-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Edit Account Type
            </button>
            <button
              v-if="data.status == 'ACTIVE'"
              @click="handleDisableAccountType(data, 'DISABLE')"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-red-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Disable Account Type
            </button>
            <button
              v-else
              @click="handleDisableAccountType(data, 'ENABLE')"
              class="rounded-sm m-2 p-1 hover:text-white hover:bg-red-500 font-normal text-xs flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
            >
              Enable Account Type
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
  </div>
  <AddGroupsToAccountType
    :show="showAddGroupsToAccountTypeModal"
    :currentAccountType="currentAccountType"
  />
  <CreateAccountType
    :show="editAccountTypeModal"
    :currentAccountType="currentAccountType"
    :state="state"
  />
  <SelectAccountFormModal
    :show="selectAccountFormModal"
    :currentAccountType="currentAccountType"
  />
  <SelectAccountNumberModal
    :show="selectAccountNumberModal"
    :currentAccountType="currentAccountType"
  />
  <SelectContactFormModal
    :show="selectContactFormModal"
    :currentAccountType="currentAccountType"
  />
</template>

<script>
import { ref } from "vue";
import { mapActions } from "vuex";
import AddGroupsToAccountType from "@/components/modals/CRMModals/AddGroupsToAccountType.vue";
import CreateAccountType from "@/components/modals/CRMModals/CreateAccountType.vue";
import SelectAccountFormModal from "@/components/modals/CRMModals/SelectAccountFormModal.vue";
import SelectAccountNumberModal from "@/components/modals/CRMModals/SelectAccountNumberModal.vue";
import SelectContactFormModal from "@/components/modals/CRMModals/SelectContactFormModal.vue";

export default {
  name: "AccountTypeTable",
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
      currentAccountType: "",
      state: "",
    };
  },
  setup() {
    const showAddGroupsToAccountTypeModal = ref(false);
    const editAccountTypeModal = ref(false);
    const selectAccountFormModal = ref(false);
    const selectAccountNumberModal = ref(false);
    const selectContactFormModal = ref(false);
    return {
      showAddGroupsToAccountTypeModal,
      editAccountTypeModal,
      selectContactFormModal,
      selectAccountFormModal,
      selectAccountNumberModal,
    };
  },
  components: {
    AddGroupsToAccountType,
    CreateAccountType,
    SelectAccountFormModal,
    SelectAccountNumberModal,
    SelectContactFormModal,
  },
  methods: {
    ...mapActions(["removeGroupAccountType", "disableAccountType"]),
    handleEditAccountType(data, state) {
      this.currentAccountType = data;
      this.state = state;
      this.editAccountTypeModal = !this.editAccountTypeModal;
    },
    handleAttachGroup(account) {
      this.currentAccountType = account;
      this.showAddGroupsToAccountTypeModal =
        !this.showAddGroupsToAccountTypeModal;
    },
    handleAttachAccountNumber(account) {
      this.currentAccountType = account;
      this.selectAccountNumberModal = !this.selectAccountNumberModal;
    },
    handleRemoveGroupFromAccount(group, account) {
      if (
        confirm(
          "Confirm remove " + group.name + " from " + account.name + "?"
        ) == true
      ) {
        console.log("remove group from account type", group.name, account.name);
        this.removeGroupAccountType({
          account_type_id: account.id,
          group_id: group.id,
        });
      } else {
        console.log("remove group from account type cancelled");
      }
    },
    handleDisableAccountType(account, action) {
      if (confirm("Confirm " + action + " " + account.name + "?") == true) {
        console.log("change state of account type", account.name);
        this.disableAccountType({
          id: account.id,
        });
      } else {
        console.log("change state of account type cancelled");
      }
    },
    handleAccountForm(account) {
      this.currentAccountType = account;
      this.selectAccountFormModal = !this.selectAccountFormModal;
    },
    handleContactForm(account) {
      this.currentAccountType = account;
      this.selectContactFormModal = !this.selectContactFormModal;
    },
  },
};
</script>

<style></style>
