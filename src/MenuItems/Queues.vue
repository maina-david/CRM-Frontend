<template>
  <div class="w-full mt-10">
    <div class="bg-white rounded-sm shadow-sm p-4" v-if="handleGuard(group)">
      <QueueTables :tableHead="tableHead" :tableData="queues" />
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import QueueTables from "@/components/tables/ContactCenterTables/QueueTable.vue";
/*import Channel from "@/componentGuard.js";*/
import Guard from "@/componentGuard.js";
import secured from "@/assets/secured.svg";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Queues",
  data() {
    return {
      tableHead: [
        "Name",
        "Description",
        "Group",
        "Status",
        "MOH",
        "Time Out",
        "Wrap Up Time",
        "Actions",
      ],
      group: "Group Management",
      myState: false,
      secured: secured,
    };
  },
  components: {
    QueueTables,
  },
  created() {
    this.getQueues();
  },
  computed: {
    ...mapGetters(["queues"]),
  },
  methods: {
    handleGuard(accessRight) {
      return Guard.accessRightMaster(accessRight);
    },
    ...mapActions(["getQueues"]),
  },
};
</script>

<style></style>
