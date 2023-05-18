<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div class="ml-12">
      <div class="border-b flex justify-between mt-10">
        <div>
          <h2 class="font-bold text-xl p-3">Quality Assurance Management</h2>
        </div>
        <div class="flex gap-6"></div>
      </div>
      <div class="bg-white p-2 mt-10">
        <QAManagementTable
          :tableHead="teamTableHead"
          :tableData="teamTableData"
        />
      </div>
    </div>
  </main>
</template>

<script>
import QAManagementTable from "@/components/tables/QAManagementTables/QAManagementTable.vue";
import { ref } from "vue";
export default {
  components: { QAManagementTable },
  data() {
    return {
      teamTableHead: [
        "team name",
        "number of members",
        "supervisor",
        "Form",
        "Queues",
        "actions",
      ],
      teamTableData: [
        {
          teamName: "Team 1",
          noOfTeamMembers: 8,
          supervisor: "Jane",
          formName: "Form Number ",
          queues: ["Queue 1", "Queue 2", "Queue 3"],
        },
        {
          teamName: "Team Number 2",
          noOfTeamMembers: 3,
          supervisor: "John Doe",
          formName: "Form Number 3 ",
          queues: ["Queue 1", "Queue 2", "Queue 3"],
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
