<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Queue Management</h2>
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
import Queues from "@/MenuItems/Queues.vue";
import MOH from "../../../MenuItems/MOH.vue";
import DialerModal from "@/components/modals/ContactCenterModals/DialerModal.vue";
import Guard from "@/componentGuard.js";

export default {
  name: "UserManagement",
  components: { Queues, MOH, DialerModal },
  props: [],
  data() {
    return {
      menuItems: ["Queues", "MOH"],
      activeTab: "Queues",
      myState: false,
      moh: "MOH Manager",
      mohQueue: "MOH Queue Manager",
      queue: "Queue Management",
      queueAgent: "Queue Agent Management",
    };
  },
  setup() {
    const showDialerModal = ref(false);
    return {
      showDialerModal,
    };
  },

  created() {
    if (this.handleGuard(this.moh)) {
      this.menuItems = ["MOH"];
      this.activeTab = "MOH";
    }
    if (this.handleGuard(this.mohQueue)) {
      this.menuItems = ["Queues", "MOH"];
      this.activeTab = "Queues";
    }
    if (this.handleGuard(this.queue)) {
      this.menuItems = ["Queues"];
      this.activeTab = "Queues";
    }
    if (this.handleGuard(this.queueAgent)) {
      this.menuItems = ["Queues"];
      this.activeTab = "Queues";
    }
    if (this.handleGuard(this.moh) && this.handleGuard(this.queue)) {
      this.menuItems = ["Queues", "MOH"];
      this.activeTab = "Queues";
    }
    if (this.handleGuard(this.queue) && this.handleGuard(this.queueAgent)) {
      this.menuItems = ["Queues"];
      this.activeTab = "Queues";
    }
    if (this.handleGuard(this.moh) && this.handleGuard(this.mohQueue)) {
      this.menuItems = ["Queues", "MOH"];
      this.activeTab = "Queues";
    }
    if (
      this.handleGuard(this.queue) &&
      this.handleGuard(this.queueAgent) &&
      this.handleGuard(this.moh)
    ) {
      this.menuItems = ["Queues", "MOH"];
      this.activeTab = "Queues";
    }
  },
  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
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
