<template>
  <div class="bg-white rounded-sm shadow-sm mt-10 p-4" v-if="handleGuard(user)">
    <Tables :tableHead="tableHead" :tableData="users" />
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
import Tables from "@/components/tables/ContactCenterTables/UserTables.vue";
import Guard from "@/componentGuard.js";
import secured from "@/assets/secured.svg";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Users",
  data() {
    return {
      tableHead: [
        "Name",
        "Email",
        "Phone",
        "Status",
        "Roles Profile",
        "Groups",
        "Actions",
      ],
      user: "User Management",
      myState: false,
      secured: secured,
    };
  },
  components: {
    Tables,
  },
  created() {
    this.getUsers();
  },
  computed: {
    ...mapGetters(["users"]),
  },
  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
    ...mapActions(["getUsers"]),
  },
};
</script>

<style></style>
