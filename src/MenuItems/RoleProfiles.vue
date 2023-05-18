<template>
  <div v-if="handleGuard(roleProfile)">
    <div class="bg-white rounded-sm shadow-sm p-4 mt-10">
      <AccessRightsTable
        :tableHead="accessRightsTableHead"
        :tableData="accessRights"
        v-if="accessRights"
      />
    </div>
    <div class="grid grid-cols-4 grid-flow-col gap-4 mt-10">
      <div class="col-span-1">
        <RoleProfileCard />
        <p></p>
      </div>
      <div class="col-span-3 w-full">
        <div class="bg-white rounded-sm shadow-sm p-4">
          <RoleProfileTable
            :tableHead="roleProfileTableHead"
            :tableData="roleProfiles"
          />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center">
    <div class="bg-white mt-24">
      <div class="m-5 p-5 text-center">
        <h2 class="font-semibold text-lg p-2">
          Sorry! You don't have access to this page.
        </h2>
        <h4 class="font-normal text-sm p-1">
          Please contact Administration for help!
        </h4>
      </div>
      <div class="m-5 p-5">
        <img :src="secured" class="p-2 h-96 w-96" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Guard from "@/componentGuard.js";
import RoleProfileTable from "@/components/tables/ContactCenterTables/RoleProfileTable.vue";
import RoleProfileCard from "@/components/cards/ContactCenterCards/RoleProfileCard.vue";
import AccessRightsTable from "@/components/tables/ContactCenterTables/AccessRightsTable.vue";
import secured from "@/assets/secured.svg";

export default {
  name: "RoleProfiles",
  data() {
    return {
      roleProfileTableHead: ["name", "access right", "description", "Actions"],
      accessRightsTableHead: [
        "access_name",
        "parent_access",
        "access_description",
      ],
      roleProfile: "Role Profile",
      myState: false,
      secured: secured,
      accessRightsData: [],
    };
  },
  components: {
    RoleProfileTable,
    RoleProfileCard,
    AccessRightsTable,
  },
  created() {
    this.getRoleProfiles();
    this.getAccessRights();
    this.accessRightsData = this.accessRights;
  },
  computed: {
    ...mapGetters(["roleProfiles", "accessRights"]),
  },
  methods: {
    ...mapActions([
      "getRoleProfiles",
      "getAccessRights",
      "getAccessRightsFormatted",
    ]),
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
  },
};
</script>

<style></style>
