<template>
  <main>
    <div class="m-10">
      <div class="mt-5 flex justify-between border-b py-4">
        <div class="">
          <h2 class="font-bold text-xl p-2">Accounts</h2>
          <h2 class="font-bold text-xl p-2"></h2>
        </div>
        <div class="flex gap-3">
          <ActionButton
            @click="handleCreateAccount({}, 'Create')"
            text="Create
          Account"
          />
          <ActionButton
            @click="showUploadBulkAccountsModal = !showUploadBulkAccountsModal"
            text="Bulk Upload Accounts"
          />
        </div>
      </div>
      <div
        class="text-sm font-medium text-center mt-5 text-gray-600 dark:text-gray-400 dark:border-gray-700"
      >
        <ul class="flex h-full p-0 m-2 list-none">
          <li
            v-for="menuItem in menuItems"
            :key="menuItem"
            @click="activeTab = menuItem"
            :class="['tab_btn', { selected: activeTab === menuItem }]"
            class="h-full first:ml-0 w-full block p-2 max-w-sm cursor-pointer"
          >
            {{ menuItem }}
          </li>
        </ul>
      </div>
      <keep-alive>
        <component :is="activeTab" />
      </keep-alive>
    </div>
    <BulkUploadAccountsModal :show="showUploadBulkAccountsModal" />
    <CreateAccountModal
      :show="showCreateAccountModal"
      :state="state"
      :currentAccount="currentAccount"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import ApprovedAccounts from "@/MenuItems/CRMMenuItems/ApprovedAccounts.vue";
import PendingApprovalAccounts from "@/MenuItems/CRMMenuItems/PendingApprovalAccounts.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateAccountModal from "@/components/modals/CRMModals/CreateAccountModal.vue";
import BulkUploadAccountsModal from "@/components/modals/CRMModals/BulkUploadAccountsModal.vue";

export default {
  name: "CRMAccounts",
  components: {
    ApprovedAccounts,
    PendingApprovalAccounts,
    ActionButton,
    CreateAccountModal,
    BulkUploadAccountsModal,
  },
  data() {
    return {
      state: "",
      currentAccount: {},
      menuItems: ["ApprovedAccounts", "PendingApprovalAccounts"],
      activeTab: "ApprovedAccounts",
    };
  },
  setup() {
    const showCreateAccountModal = ref(false);
    const showUploadBulkAccountsModal = ref(false);

    return {
      showCreateAccountModal,
      showUploadBulkAccountsModal,
    };
  },
  methods: {
    handleCreateAccount(data, state) {
      this.state = state;
      this.currentAccount = data;
      this.showCreateAccountModal = !this.showCreateAccountModal;
    },
  },
};
</script>

<style>
.tab-btn {
  padding: 6px 10px;
  background: #ffffff;
  cursor: pointer;
  margin-bottom: 1rem;
  border: 2px solid #cccccc;
  outline: none;
}
.selected {
  border-bottom: 3px solid #84cc16;
}
</style>
