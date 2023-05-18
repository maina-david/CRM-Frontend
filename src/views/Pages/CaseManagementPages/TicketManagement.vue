<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Ticket Management</h2>
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
            class="h-full first:ml-0 w-full block p-2 max-w-sm"
          >
            {{ menuItem }}
          </li>
        </ul>
      </div>
      <keep-alive>
        <component :is="activeTab" />
      </keep-alive>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";
import AssignedTicket from "@/MenuItems/CaseManagementMenuItems/AssignedTicket.vue";
import AllTickets from "@/MenuItems/CaseManagementMenuItems/AllTickets.vue";

export default {
  name: "TicketManagement",
  components: { AssignedTicket, AllTickets },
  props: [],
  data() {
    return {
      menuItems: ["AllTickets", "AssignedTicket"],
      activeTab: "AllTickets",
    };
  },
  setup() {
    const showDialerModal = ref(false);
    return {
      showDialerModal,
    };
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
