<template>
  <main>
    <div class="m-10">
      <div class="mt-5 flex justify-between border-b py-4">
        <div class="">
          <h2 class="font-bold text-xl p-2">Contacts</h2>
        </div>
        <div class="flex gap-3">
          <ActionButton
            @click="handleCreateContact({}, 'create')"
            text="Create Contact"
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
    <CreateContactModal
      :show="showCreateContactModal"
      :state="state"
      :currentContact="currentContact"
    />
  </main>
</template>

<script>
import { ref } from "vue";
import ApprovedContacts from "@/MenuItems/CRMMenuItems/ApprovedContacts.vue";
import PendingApprovalContacts from "@/MenuItems/CRMMenuItems/PendingApprovalContacts.vue";
import ActionButton from "@/components/ActionButton.vue";
import CreateContactModal from "@/components/modals/CRMModals/CreateContactModal.vue";

export default {
  name: "CRMContacts",
  components: {
    ApprovedContacts,
    PendingApprovalContacts,
    ActionButton,
    CreateContactModal,
  },
  data() {
    return {
      state: "",
      currentContact: {},
      menuItems: ["ApprovedContacts", "PendingApprovalContacts"],
      activeTab: "ApprovedContacts",
    };
  },
  setup() {
    const showCreateContactModal = ref(false);
    return {
      showCreateContactModal,
    };
  },
  methods: {
    handleCreateContact(data, state) {
      this.state = state;
      this.currentContact = data;
      this.showCreateContactModal = !this.showCreateContactModal;
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
