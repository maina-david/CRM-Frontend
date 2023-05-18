<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Team Details(With Team Name)</h2>
        </div>
        <div class="flex gap-6"></div>
      </div>
      <div class="bg-white p-2 mt-10">
        <TeamDetails :tableHead="teamTableHead" :tableData="teamTableData" />
      </div>
    </div>
  </main>
</template>

<script>
import TeamDetails from "@/components/tables/QAManagementTables/TeamDetails.vue";
import { ref } from "vue";
export default {
  components: { TeamDetails },
  data() {
    return {
      teamTableHead: ["name", "status", "current load", "actions"],
      teamTableData: [
        {
          name: "Jane Doe",
          status: "Available",
          currentLoad: 26,
        },
        {
          name: "John Kiriamiti",
          status: "Not Available",
          currentLoad: 18,
        },
        {
          name: "Jane Doe",
          status: "Available",
          currentLoad: 26,
        },
        {
          name: "John Kiriamiti",
          status: "Not Available",
          currentLoad: 18,
        },
        {
          name: "Jane Doe",
          status: "Available",
          currentLoad: 26,
        },
        {
          name: "John Kiriamiti",
          status: "Not Available",
          currentLoad: 18,
        },
        {
          name: "Jane Doe",
          status: "Available",
          currentLoad: 26,
        },
        {
          name: "John Kiriamiti",
          status: "Not Available",
          currentLoad: 18,
        },
      ],
    };
  },
  setup() {
    const showCreateTeamModal = ref(false);

    return {
      showCreateTeamModal,
    };
  },
};
</script>

<style></style>
