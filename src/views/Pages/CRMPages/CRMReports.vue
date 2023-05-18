<template>
  <main>
    <div class="ml-12">
      <div class="border-b mt-10">
        <h2 class="font-bold text-xl m-4">CRM Reports</h2>
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
        <component
          :is="activeTab"
          :selectGroups="selectGroups"
          :selectRoleProfiles="selectRoleProfiles"
        />
      </keep-alive>
    </div>
  </main>
</template>

<script>
import CRMReport from "@/MenuItems/CRMMenuItems/CRMReport.vue";
import CampaignsReport from "@/MenuItems/CRMMenuItems/CampaignsReport.vue";
import SurveyReports from "@/MenuItems/CRMMenuItems/SurveyReports.vue";

export default {
  components: { CRMReport, CampaignsReport, SurveyReports },
  data() {
    return {
      menuItems: ["CRMReport", "CampaignsReport", "SurveyReports"],
      activeTab: "CRMReport",
    };
  },
};
</script>
<style scoped>
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
