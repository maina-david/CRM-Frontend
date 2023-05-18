<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">Forms</h2>
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
            class="h-full first:ml-0 w-full block p-2 cursor-pointer max-w-sm"
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
import AccountForms from "@/MenuItems/CRMMenuItems/AccountForms.vue";
import ContactForms from "@/MenuItems/CRMMenuItems/ContactForms.vue";

export default {
  name: "CRMForms",
  data() {
    return {
      menuItems: ["AccountForms", "ContactForms"],
      activeTab: "AccountForms",
    };
  },
  components: { AccountForms, ContactForms },
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
