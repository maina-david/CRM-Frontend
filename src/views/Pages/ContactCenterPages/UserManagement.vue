<template>
  <main>
    <div class="ml-12">
      <div class="border-b">
        <h2 class="mt-10 font-bold text-xl p-3">User Management</h2>
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
import { mapActions, mapGetters } from "vuex";

import Invites from "@/MenuItems/Invites.vue";
import Users from "@/MenuItems/Users.vue";
import RoleProfiles from "@/MenuItems/RoleProfiles.vue";
import DialerModal from "@/components/modals/ContactCenterModals/DialerModal.vue";
import Guard from "@/componentGuard.js";

export default {
  name: "UserManagement",
  components: { Invites, Users, RoleProfiles, DialerModal },
  props: [],
  data() {
    return {
      menuItems: ["Users", "Invites", "RoleProfiles"],
      activeTab: "Users",
      user: "User Management",
      invite: "Invitation Management",
      roleProfile: "Role Profile",
      myState: false,
    };
  },
  created() {
    this.getGroups();
    this.getRoleProfiles();
    this.getQueues();
    /* if (this.handleGuardUser()) {
      this.menuItems = [...this.menuItems, "Users"];
      this.activeTab = "Users";
    }

    if (this.handleGuardInvitation()) {
      this.menuItems = [...this.menuItems, "Invites"];
      this.activeTab = "Invites";
    }
    if (this.handleGuardRoleProfile()) {
      this.menuItems = [...this.menuItems, "RoleProfiles"];
      this.activeTab = "RoleProfile";
    }*/

    if (this.handleGuard(this.user)) {
      this.menuItems = ["Users"];
      this.activeTab = "Users";
    }
    if (this.handleGuard(this.roleProfile)) {
      this.menuItems = ["RoleProfile"];
      this.activeTab = "RoleProfiles";
    }
    if (this.handleGuard(this.invite)) {
      this.menuItems = ["Invites"];
      this.activeTab = "Invites";

      // eslint-disable-next-line no-dupe-else-if
    }
    if (
      this.handleGuard(this.roleProfile) &&
      this.handleGuard(this.user) & !this.handleGuard(this.invite)
    ) {
      this.menuItems = ["Users", "RoleProfiles"];
      this.activeTab = "Users";

      // eslint-disable-next-line no-dupe-else-if
    }
    if (
      this.handleGuard(this.roleProfile) &&
      this.handleGuard(this.invite) & !this.handleGuard(this.user)
    ) {
      this.menuItems = ["Invites", "RoleProfiles"];
      this.activeTab = "Invites";

      // eslint-disable-next-line no-dupe-else-if
    }
    if (
      this.handleGuard(this.user) &&
      this.handleGuard(this.invite) & !this.handleGuard(this.roleProfile)
    ) {
      this.menuItems = ["Users", "Invites"];
      this.activeTab = "Users";
    }
    if (
      this.handleGuard(this.user) &&
      this.handleGuard(this.invite) &&
      this.handleGuard(this.roleProfile)
    ) {
      this.menuItems = ["Users", "Invites", "RoleProfiles"];
      this.activeTab = "Users";
    }
  },
  computed: {
    ...mapGetters([
      "selectRoleProfiles",
      "selectGroups",
      "roleProfiles",
      "queues",
    ]),
  },
  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
    ...mapActions(["getGroups", "getRoleProfiles", "getQueues"]),
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
